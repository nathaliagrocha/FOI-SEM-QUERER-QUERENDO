var crypto = require("crypto");
var usuarioModel = require("../models/usuarioModel");

// Guarda as sessões ativas na memória do servidor.
// A chave é o token e o valor são os dados básicos do usuário.
// Como fica em memória, ao reiniciar o servidor os usuários precisam fazer login novamente.
var sessoes = {};

// Controller: autenticar
// Valida os dados recebidos, confere email/senha no banco e cria um token de sessão.
function autenticar(req, res) {
    var email = String(req.body.emailServer || "").trim().toLowerCase();
    var senha = String(req.body.senhaServer || "");

    if (email == "") {
        res.status(400).send("Seu email está em branco!");
    } else if (senha == "") {
        res.status(400).send("Sua senha está em branco!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    if (resultadoAutenticar.length == 1) {
                        var usuario = resultadoAutenticar[0];

                        // Gera um token aleatório e guarda no servidor qual usuário ele representa.
                        var token = crypto.randomBytes(32).toString("hex");
                        sessoes[token] = {
                            id: usuario.id,
                            nome: usuario.nome,
                            email: usuario.email
                        };

                        // A senha não é devolvida para o frontend.
                        res.json({
                            token: token,
                            id: usuario.id,
                            email: usuario.email,
                            nome: usuario.nome
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log("Erro ao realizar o login: ", erro.message);
                    res.status(500).send("Erro interno ao realizar o login.");
                }
            );
    }
}

// Controller: cadastrar
// Recebe os dados do formulário, valida e delega para o model inserir no banco.
function cadastrar(req, res) {
    var nome = String(req.body.nomeServer || "").trim();
    var email = String(req.body.emailServer || "").trim().toLowerCase();
    var senha = String(req.body.senhaServer || "");

    if (nome == "") {
        res.status(400).send("Seu nome está em branco!");
    } else if (email == "") {
        res.status(400).send("Seu email está em branco!");
    } else if (senha == "") {
        res.status(400).send("Sua senha está em branco!");
    } else {
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log("Erro ao realizar o cadastro: ", erro.message);
                    res.status(500).send("Erro interno ao realizar o cadastro.");
                }
            );
    }
}

// Controller: validarSessao
// Recebe o token pelo cabeçalho "x-access-token" e confirma no servidor se ele existe.
// A dashboard usa essa rota para saber quem está conectado.
function validarSessao(req, res) {
    var token = req.headers["x-access-token"];
    var usuario = obterUsuarioPorToken(token);

    if (usuario == null) {
        res.status(401).json({ autenticado: false });
    } else {
        res.json({
            autenticado: true,
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        });
    }
}

// Função obterUsuarioPorToken
// Procura o usuário dono do token. As próximas rotas do backend devem usar esta função
// e pegar o ID daqui, e nunca confiar em um ID enviado pelo navegador.
function obterUsuarioPorToken(token) {
    if (token == undefined) {
        return null;
    }

    var usuario = sessoes[token];

    if (usuario == undefined) {
        return null;
    }

    return usuario;
}

// Controller: sair
// Apaga o token da memória do servidor para encerrar a sessão.
function sair(req, res) {
    var token = req.headers["x-access-token"];

    if (token != undefined) {
        delete sessoes[token];
    }

    res.status(200).send("Sessão encerrada.");
}

module.exports = {
    autenticar,
    cadastrar,
    validarSessao,
    sair,
    obterUsuarioPorToken
};
