// Função validarSessao
// Confere se existem os dados da sessão e pergunta ao servidor se o token ainda é válido.
// Se não houver sessão (ou o token for inválido), manda o usuário para o login.
// Se estiver tudo certo, mostra o nome do usuário no elemento "b_usuario".
function validarSessao() {
    var token = sessionStorage.getItem("TOKEN_USUARIO");
    var email = sessionStorage.getItem("EMAIL_USUARIO");
    var nome = sessionStorage.getItem("NOME_USUARIO");
    var id = sessionStorage.getItem("ID_USUARIO");

    if (token == null || email == null || nome == null || id == null) {
        window.location = "../login.html";
        return;
    }

    // Valida o token no servidor, e não apenas no navegador.
    fetch("/usuarios/sessao", {
        method: "GET",
        headers: {
            "x-access-token": token
        }
    }).then(function (resposta) {
        if (!resposta.ok) {
            limparSessao();
            return;
        }

        resposta.json().then(function (json) {
            if (json.autenticado != true) {
                limparSessao();
                return;
            }

            // Atualiza os dados com o que o servidor confirmou.
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
        limparSessao();
    });
}

// Função limparSessao
// Avisa o servidor para apagar o token, limpa a sessionStorage e volta para o login.
function limparSessao() {
    var token = sessionStorage.getItem("TOKEN_USUARIO");

    if (token != null) {
        fetch("/usuarios/sair", {
            method: "POST",
            headers: {
                "x-access-token": token
            },
            keepalive: true
        }).catch(function (erro) {
            console.log("#ERRO ao encerrar sessão: " + erro);
        });
    }

    sessionStorage.clear();
    window.location = "../login.html";
}

// Função obterIdUsuario
// Devolve o ID do usuário logado para ser usado nas próximas consultas.
// As consultas devem enviar esse ID ao backend, que confere a sessão antes de buscar os dados.
function obterIdUsuario() {
    var id = sessionStorage.getItem("ID_USUARIO");

    if (id == null) {
        return null;
    }

    return Number(id);
}

// Função obterTokenSessao
// Devolve o token para as próximas requisições autenticadas.
function obterTokenSessao() {
    return sessionStorage.getItem("TOKEN_USUARIO");
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
