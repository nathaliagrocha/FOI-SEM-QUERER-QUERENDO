var quizModel = require("../models/quizModel");
var usuarioController = require("./usuarioController");

// O servidor conhece a quantidade de questões de cada quiz.
// Assim, o navegador não consegue inventar um total diferente.
var quizzes_validos = {
    1: 20,
    2: 20,
    3: 13
};

// Controller: salvar_resultado
// Identifica o usuário pelo token da sessão e grava uma tentativa do quiz.
// O ID do usuário nunca é recebido do navegador.
function salvar_resultado(req, res) {
    var token = req.headers["x-access-token"];
    var usuario = usuarioController.obterUsuarioPorToken(token);

    if (usuario == null) {
        res.status(401).send("Sessão inválida. Faça login novamente.");
        return;
    }

    var numero_quiz = Number(req.body.numero_quiz);
    var total_acertos = Number(req.body.total_acertos);
    var total_questoes = quizzes_validos[numero_quiz];

    if (total_questoes == undefined) {
        res.status(400).send("Quiz inválido.");
        return;
    }

    if (!Number.isInteger(total_acertos) || total_acertos < 0 || total_acertos > total_questoes) {
        res.status(400).send("Quantidade de acertos inválida.");
        return;
    }

    // A pontuação é calculada aqui no servidor (de 0 a 100), nunca recebida do navegador.
    // Arredonda para duas casas decimais apenas no final.
    var pontuacao = Math.round((total_acertos / total_questoes) * 10000) / 100;

    quizModel.salvar_resultado(usuario.id, numero_quiz, total_acertos, total_questoes, pontuacao)
        .then(function (resultado) {
            res.status(201).json({
                mensagem: "Resultado salvo com sucesso.",
                id: resultado.insertId
            });
        })
        .catch(function (erro) {
            console.log("Erro ao salvar resultado do quiz: ", erro.message);
            res.status(500).send("Erro interno ao salvar o resultado.");
        });
}

module.exports = {
    salvar_resultado
};
