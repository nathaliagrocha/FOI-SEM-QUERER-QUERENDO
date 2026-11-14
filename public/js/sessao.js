// Função validarSessao
// Verifica se existem dados de sessão (nome e email). Se existirem, atualiza o botão do usuário.
// Caso contrário, redireciona para a página de login.
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

// Função limparSessao
// Limpa todos os dados da sessionStorage e redireciona para o login
function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// Função aguardar
// Mostra a tela/elemento de carregamento (div_aguardar)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

// Função finalizarAguardar
// Esconde o carregamento e opcionalmente mostra uma mensagem de erro
function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

