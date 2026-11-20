// Função validarSessao
// Confere se existem os dados da sessão e pergunta ao servidor se o usuário ainda está logado.
// Se não houver sessão, manda o usuário para o login.
// Se estiver tudo certo, mostra o nome do usuário no elemento "b_usuario".
function validarSessao() {
    var id = sessionStorage.getItem("ID_USUARIO");
    var email = sessionStorage.getItem("EMAIL_USUARIO");
    var nome = sessionStorage.getItem("NOME_USUARIO");

    if (id == null || email == null || nome == null) {
        window.location = "../login.html";
        return;
    }

    // Valida o usuário no servidor, e não apenas no navegador.
    fetch("/usuarios/sessao", {
        method: "GET",
        headers: {
            "x-user-id": id
        }
    }).then(function (resposta) {
        if (!resposta.ok) {
            sessionStorage.clear();
            window.location = "../login.html";
            return;
        }

        resposta.json().then(function (json) {
            // Atualiza os dados com os que o servidor confirmou.
            sessionStorage.setItem("ID_USUARIO", json.id);
            sessionStorage.setItem("NOME_USUARIO", json.nome);
            sessionStorage.setItem("EMAIL_USUARIO", json.email);

            var b_usuario = document.getElementById("b_usuario");
            if (b_usuario != null) {
                b_usuario.innerHTML = json.nome;
            }
        });
    }).catch(function (erro) {
        console.log("#ERRO ao validar sessão: " + erro);
        sessionStorage.clear();
        window.location = "../login.html";
    });
}

// Função obterIdUsuario
// Devolve o ID do usuário logado para ser usado nas próximas consultas.
// O servidor confere a sessão antes de buscar os dados.
function obterIdUsuario() {
    var id = sessionStorage.getItem("ID_USUARIO");

    if (id == null) {
        return null;
    }

    return Number(id);
}

// Função aguardar
// Mostra a tela/elemento de carregamento (div_aguardar), se ele existir na página.
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    if (divAguardar != null) {
        divAguardar.style.display = "flex";
    }
}

// Função finalizarAguardar
// Esconde o carregamento e opcionalmente mostra uma mensagem de erro.
function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    if (divAguardar != null) {
        divAguardar.style.display = "none";
    }

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto && divErrosLogin != null) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}
