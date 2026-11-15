// Motor do quiz.
// As perguntas dos três quizzes ficam em js/quiz_dados.js (objeto "quizzes").
// A tela de seleção chama iniciar_quiz(numero_quiz) para começar um quiz ali mesmo.

// Protege a tela: sem sessão válida, volta para o login.
validarSessao();

// Se o navegador restaurar a página pelo botão "Voltar", valida a sessão de novo.
window.addEventListener("pageshow", function (evento) {
    if (evento.persisted) {
        validarSessao();
    }
});

let id_quiz_atual = 0;
let lista_de_questoes = [];
let numero_da_questao_atual = 0;
let quantidade_de_questoes = 0;
let acertos = 0;
let pontuacao_final = 0;
let resultado_salvo = false;

// Começa o quiz escolhido na tela de seleção.
function iniciar_quiz(numero_quiz) {
    id_quiz_atual = numero_quiz;
    lista_de_questoes = quizzes[numero_quiz];

    numero_da_questao_atual = 0;
    quantidade_de_questoes = lista_de_questoes.length;
    acertos = 0;
    pontuacao_final = 0;
    resultado_salvo = false;

    document.getElementById("tela_selecao").style.display = "none";
    document.getElementById("tela_quiz").style.display = "flex";

    document.getElementById("pontuacao").style.display = "flex";
    document.getElementById("jogo").style.display = "flex";
    document.getElementById("tela_resultado").style.display = "none";

    document.getElementById("qtdQuestoes").innerHTML = quantidade_de_questoes;

    document.getElementById("jogo").classList.remove("text-new-gray");

    btnSubmeter.innerHTML = "Submeter resposta";
    btnProx.innerHTML = "Avançar para próxima questão";
    btnSubmeter.disabled = false;
    btnProx.disabled = true;
    btnTentarNovamente.disabled = true;

    preencherHTMLcomQuestaoAtual(0);
}

// Volta para a tela com os três quizzes.
function voltar_para_selecao() {
    document.getElementById("tela_quiz").style.display = "none";
    document.getElementById("tela_selecao").style.display = "flex";
}

function preencherHTMLcomQuestaoAtual(index) {
    habilitarAlternativas(true);

    const questao_atual = lista_de_questoes[index];
    numero_da_questao_atual = index;

    document.getElementById("spanNumeroDaQuestaoAtual").innerHTML = Number(index) + 1;
    document.getElementById("spanQuestaoExibida").innerHTML = questao_atual.pergunta;
    document.getElementById("labelOpcaoUm").innerHTML = questao_atual.alternativaA;
    document.getElementById("labelOpcaoDois").innerHTML = questao_atual.alternativaB;
    document.getElementById("labelOpcaoTres").innerHTML = questao_atual.alternativaC;
    document.getElementById("labelOpcaoQuatro").innerHTML = questao_atual.alternativaD;
}

function submeter() {
    const options = document.getElementsByName("option");

    let tem_alternativa_marcada = false;

    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            tem_alternativa_marcada = true;
            break;
        }
    }

    if (!tem_alternativa_marcada) {
        alert("Não há alternativas escolhidas. Escolha uma opção.");
        return;
    }

    // A correção acontece internamente, sem mostrar se acertou ou errou.
    checarResposta();

    btnSubmeter.disabled = true;
    btnProx.disabled = false;
    habilitarAlternativas(false);

    // Na última questão, o botão de avançar passa a finalizar o quiz.
    if (numero_da_questao_atual >= quantidade_de_questoes - 1) {
        btnProx.innerHTML = "Finalizar quiz";
    }
}

function habilitarAlternativas(trueOrFalse) {
    let opcao_desabilitada = trueOrFalse ? false : true;

    primeiraOpcao.disabled = opcao_desabilitada;
    segundaOpcao.disabled = opcao_desabilitada;
    terceiraOpcao.disabled = opcao_desabilitada;
    quartaOpcao.disabled = opcao_desabilitada;
}

function avancar() {
    if (numero_da_questao_atual < quantidade_de_questoes - 1) {
        desmarcarRadioButtons();
        preencherHTMLcomQuestaoAtual(numero_da_questao_atual + 1);
        btnProx.innerHTML = "Avançar para próxima questão";
        btnProx.disabled = true;
        btnSubmeter.disabled = false;
    } else {
        finalizarJogo();
    }
}

function tentarNovamente() {
    iniciar_quiz(id_quiz_atual);
}

// Soma um acerto se a alternativa marcada for a correta.
// A resposta correta continua guardada nos dados, sem aparecer na tela.
function checarResposta() {
    const questao_atual = lista_de_questoes[numero_da_questao_atual];
    const resposta_correta = questao_atual.alternativaCorreta;
    const options = document.getElementsByName("option");

    for (let i = 0; i < options.length; i++) {
        if (options[i].checked && options[i].value === resposta_correta) {
            acertos++;
            break;
        }
    }
}

function desmarcarRadioButtons() {
    const options = document.getElementsByName("option");

    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// Calcula a pontuação de 0 a 100 de forma proporcional.
// Vale tanto para o quiz de 20 questões quanto para o de 13.
// O arredondamento para duas casas decimais é feito somente no final.
function calcular_pontuacao() {
    return Math.round((acertos / quantidade_de_questoes) * 10000) / 100;
}

// Mostra a pontuação com vírgula (ex.: 76,92).
function formatar_pontuacao(valor) {
    return valor.toString().replace(".", ",");
}

function finalizarJogo() {
    pontuacao_final = calcular_pontuacao();

    document.getElementById("jogo").classList.add("text-new-gray");

    btnProx.disabled = true;
    btnSubmeter.disabled = true;
    btnTentarNovamente.disabled = false;

    // Salva o resultado e, quando terminar, mostra a mensagem final no lugar do quiz.
    salvar_resultado().then(function (pode_continuar) {
        if (pode_continuar == false) {
            return;
        }

        document.getElementById("spanResultadoPontuacao").innerHTML = formatar_pontuacao(pontuacao_final);

        document.getElementById("pontuacao").style.display = "none";
        document.getElementById("jogo").style.display = "none";
        document.getElementById("tela_resultado").style.display = "flex";
    });
}

function salvar_resultado() {
    if (resultado_salvo) {
        return Promise.resolve(true);
    }

    resultado_salvo = true;

    const token = obterTokenSessao();

    if (token == null) {
        console.log("Resultado não salvo: sessão não encontrada.");
        return Promise.resolve(true);
    }

    // Envia apenas o número do quiz e a quantidade de acertos.
    // A pontuação é calculada no servidor, nunca enviada pelo navegador.
    return fetch("/quizzes/resultado", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify({
            numero_quiz: id_quiz_atual,
            total_acertos: acertos
        })
    }).then(function (resposta) {
        if (resposta.status == 401) {
            limparSessao();
            return false;
        }

        if (!resposta.ok) {
            console.log("Resultado não salvo. Status: " + resposta.status);
        }

        return true;
    }).catch(function (erro) {
        console.log("#ERRO ao salvar resultado do quiz: " + erro);
        return true;
    });
}
