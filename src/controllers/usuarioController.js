var usuarioModel = require("../models/usuarioModel");

// Guarda as sessões ativas na memória do servidor.
// A chave é o ID do usuário e o valor são os dados básicos do usuário.
// Como fica em memória, ao reiniciar o servidor os usuários precisam fazer login novamente.
var sessoes = {};

// Controller: autenticar
// Valida os dados recebidos, confere email/senha no banco e inicia a sessão do usuário.
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

                        // Inicia a sessão identificando o usuário pelo ID.
                        sessoes[usuario.id] = {
                            nome: usuario.nome,
                            email: usuario.email
                        };

                        // A senha não é devolvida para o frontend.
                        res.json({
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
        // Validar senha: deve conter pelo menos uma letra maiúscula e uma minúscula
        // usar toUpperCase/toLowerCase para verificar presença de maiúscula e minúscula
        var temMaiuscula = senha !== senha.toLowerCase();
        var temMinuscula = senha !== senha.toUpperCase();
        if (!temMaiuscula || !temMinuscula) {
            res.status(400).send("A senha deve conter pelo menos uma letra maiúscula e uma minúscula.");
            return;
        }
        // Verificar se o email já existe
        usuarioModel.buscarPorEmail(email)
            .then(function (resultadoBusca) {
                if (resultadoBusca.length > 0) {
                    // Já existe usuário com esse email
                    res.status(409).send("Este e-mail já está cadastrado.");
                    return;
                }

                // Não existe, prosseguir com o cadastro
                usuarioModel.cadastrar(nome, email, senha)
                    .then(function (resultado) {
                        res.json(resultado);
                    }).catch(function (erro) {
                        console.log("Erro ao realizar o cadastro: ", erro.message);
                        res.status(500).send("Erro interno ao realizar o cadastro.");
                    });
            }).catch(function (erro) {
                console.log("Erro ao verificar email: ", erro.message);
                res.status(500).send("Erro interno ao verificar email.");
            });
    }
}

// Controller: validarSessao
// Recebe o ID do usuário no header "x-user-id" e confirma no servidor se a sessão dele ainda é válida.
// A dashboard usa essa rota para saber quem está conectado.
function validarSessao(req, res) {
    var idUsuario = Number(req.headers["x-user-id"]);
    var usuario = obterUsuarioAutenticado(idUsuario);

    if (usuario == null) {
        res.status(401).json({ autenticado: false });
    } else {
        res.json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        });
    }
}

// Função obterUsuarioAutenticado
// Procura o usuário logado no servidor. As próximas rotas do backend devem usar esta função
// e pegar o ID daqui, e nunca confiar em um ID enviado pelo navegador.
function obterUsuarioAutenticado(idUsuario) {
    if (idUsuario == undefined || idUsuario == null) {
        return null;
    }

    var usuario = sessoes[idUsuario];

    if (usuario == undefined) {
        return null;
    }

    return {
        id: Number(idUsuario),
        nome: usuario.nome,
        email: usuario.email
    };
}

module.exports = {
    autenticar,
    cadastrar,
    validarSessao,
    obterUsuarioAutenticado
};
