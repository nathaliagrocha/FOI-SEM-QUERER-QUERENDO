// Motor do quiz.
// Cada página do quiz (quiz.html, quiz_2.html, quiz_3.html) guarda as próprias
// questões em uma constante "listaDeQuestoes" dentro do script da página.
// A estrutura do script segue o exemplo em DOCUMENTOS_DE_APOIO/exemplo_de_quiz/.

// Protege a tela: sem sessão válida, volta para o login.
validarSessao();

// Se o navegador restaurar a página pelo botão Voltar, valida a sessão de novo.
window.addEventListener("pageshow", function (evento) {
    if (evento.persisted) {
        validarSessao();
    }
});

let numeroDaQuestaoAtual = 0
let pontuacaoFinal = 0
let tentativaIncorreta = 0
let certas = 0
let erradas = 0
let quantidadeDeQuestoes = listaDeQuestoes.length

// Esconde o jogo: ele só aparece quando o usuário clica em "INICIAR QUIZ".
function onloadEsconder() {
    document.getElementById('pontuacao').style.display = "none"
    document.getElementById('jogo').style.display = "none"
}

// Mostra o jogo e exibe a primeira questão.
function iniciarQuiz() {
    document.getElementById('pontuacao').style.display = "flex"
    document.getElementById('jogo').style.display = "flex"
    document.getElementById('btnIniciarQuiz').style.display = "none"

    document.getElementById('qtdQuestoes').innerHTML = quantidadeDeQuestoes

    preencherHTMLcomQuestaoAtual(0)

    btnSubmeter.disabled = false
    btnProx.disabled = true
    btnTentarNovamente.disabled = true
}

// Exibe a pergunta e as quatro alternativas do índice informado.
function preencherHTMLcomQuestaoAtual(index) {
    habilitarAlternativas(true)

    const questaoAtual = listaDeQuestoes[index]
    numeroDaQuestaoAtual = index

    document.getElementById("spanNumeroDaQuestaoAtual").innerHTML = Number(index) + 1 // o index começa em 0
    document.getElementById("spanQuestaoExibida").innerHTML = questaoAtual.pergunta;
    document.getElementById("labelOpcaoUm").innerHTML = questaoAtual.alternativaA;
    document.getElementById("labelOpcaoDois").innerHTML = questaoAtual.alternativaB;
    document.getElementById("labelOpcaoTres").innerHTML = questaoAtual.alternativaC;
    document.getElementById("labelOpcaoQuatro").innerHTML = questaoAtual.alternativaD;
}

function submeter() {
    const options = document.getElementsByName("option");

    let hasChecked = false
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            hasChecked = true
            break
        }
    }

    if (!hasChecked) {
        alert("Não há alternativas escolhidas. Escolha uma opção.")
    } else {
        btnSubmeter.disabled = true
        btnProx.disabled = false

        habilitarAlternativas(false)

        checarResposta()
    }
}

function habilitarAlternativas(trueOrFalse) {
    let opcaoEscolhida = trueOrFalse ? false : true

    primeiraOpcao.disabled = opcaoEscolhida
    segundaOpcao.disabled = opcaoEscolhida
    terceiraOpcao.disabled = opcaoEscolhida
    quartaOpcao.disabled = opcaoEscolhida
}

function avancar() {
    btnProx.disabled = true
    btnSubmeter.disabled = false

    desmarcarRadioButtons()

    if (numeroDaQuestaoAtual < quantidadeDeQuestoes - 1) {
        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual)
    } else if (numeroDaQuestaoAtual == quantidadeDeQuestoes - 1) {
        alert("Atenção... a próxima é a ultima questão!")
        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual)
    } else {
        finalizarJogo()
    }
}

function tentarNovamente() {
    window.location.reload()
}

// Conta acertos e erros. Sem colorir as alternativas ao selecionar.
function checarResposta() {
    const questaoAtual = listaDeQuestoes[numeroDaQuestaoAtual]
    const respostaQuestaoAtual = questaoAtual.alternativaCorreta

    const options = document.getElementsByName("option");

    options.forEach((option) => {
        if (option.checked === true && option.value === respostaQuestaoAtual) {
            pontuacaoFinal++
            certas++
            document.getElementById("spanCertas").innerHTML = certas
            numeroDaQuestaoAtual++
        } else if (option.checked && option.value !== respostaQuestaoAtual) {
            tentativaIncorreta++
            erradas++
            document.getElementById("spanErradas").innerHTML = erradas
            numeroDaQuestaoAtual++
        }
    })
}

function desmarcarRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// Função sem uso (sem colorir as alternativas ao avançar):
// function limparCoresBackgroundOpcoes() {
//     const options = document.getElementsByName("option");
//     options.forEach((option) => {
//         document.getElementById(option.labels[0].id).classList.remove("text-danger-with-bg")
//         document.getElementById(option.labels[0].id).classList.remove("text-success-with-bg")
//     })
// }

function finalizarJogo() {
    let textoParaMensagemFinal = null
    let classComCoresParaMensagemFinal = null
    const porcentagemFinalDeAcertos = pontuacaoFinal / quantidadeDeQuestoes

    if (porcentagemFinalDeAcertos <= 0.3) {
        textoParaMensagemFinal = "Parece que você não estudou..."
        classComCoresParaMensagemFinal = "text-danger-with-bg"
    }
    else if (porcentagemFinalDeAcertos > 0.3 && porcentagemFinalDeAcertos < 0.9) {
        textoParaMensagemFinal = "Pode melhorar na próxima, hein!"
        classComCoresParaMensagemFinal = "text-warning-with-bg"
    }
    else if (porcentagemFinalDeAcertos >= 0.9) {
        textoParaMensagemFinal = "Uau, parabéns!"
        classComCoresParaMensagemFinal = "text-success-with-bg"
    }

    textoParaMensagemFinal += "<br> Você acertou " + Math.round((porcentagemFinalDeAcertos)*100) + "% das questões."

    document.getElementById('msgFinal').innerHTML = textoParaMensagemFinal
    document.getElementById('msgFinal').classList.add(classComCoresParaMensagemFinal)
    document.getElementById('spanPontuacaoFinal').innerHTML = pontuacaoFinal

    document.getElementById('jogo').classList.add("text-new-gray")

    btnProx.disabled = true
    btnSubmeter.disabled = true
    btnTentarNovamente.disabled = false

    // Salva a tentativa no banco (funcionalidade mantida do flow atual).
    salvar_resultado();
}

// Salva a tentativa do quiz no banco: envia o número do quiz (definido em cada
// página) e a quantidade de acertos. O usuário é identificado pela sessão.
function salvar_resultado() {
    const idUsuario = obterIdUsuario();

    if (idUsuario == null) {
        console.log("Resultado não salvo: sessão não encontrada.");
        return;
    }

    return fetch("/quizzes/resultado", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-user-id": idUsuario
        },
        body: JSON.stringify({
            numero_quiz: numero_do_quiz,
            total_acertos: certas
        })
    }).then(function (resposta) {
        if (!resposta.ok) {
            console.log("Resultado não salvo. Status: " + resposta.status);
        }
    }).catch(function (erro) {
        console.log("#ERRO ao salvar resultado do quiz: " + erro);
    });
}
