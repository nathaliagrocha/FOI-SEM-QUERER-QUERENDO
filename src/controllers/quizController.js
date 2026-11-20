var quizModel = require("../models/quizModel");
var usuarioController = require("./usuarioController");

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

    if (!Number.isInteger(numero_quiz) || numero_quiz < 1) {
        res.status(400).send("Quiz inválido.");
        return;
    }

    quizModel.buscarPorId(numero_quiz)
        .then(function (resultadoQuiz) {
            var quiz = resultadoQuiz[0];

            // O quiz precisa existir na tabela para a tentativa ser registrada.
            if (quiz == undefined) {
                res.status(400).send("Quiz inválido.");
                return;
            }

            var total_questoes = Number(quiz.total_questoes);

            if (!Number.isInteger(total_acertos) || total_acertos < 0 || total_acertos > total_questoes) {
                res.status(400).send("Quantidade de acertos inválida.");
                return;
            }

            // A pontuação é calculada aqui no servidor (de 0 a 100), nunca recebida do navegador.
            // Arredonda para duas casas decimais apenas no final.
            var pontuacao = Math.round((total_acertos / total_questoes) * 10000) / 100;

            // Salva a tentativa para o usuário identificado pelo token da sessão.
            return quizModel.salvar_resultado(usuario.id, numero_quiz, total_acertos, total_questoes, pontuacao)
                .then(function (resultado) {
                    res.status(201).json({
                        mensagem: "Resultado salvo com sucesso.",
                        id: resultado.insertId
                    });
                });
        })
        .catch(function (erro) {
            console.log("Erro ao salvar resultado do quiz: ", erro.message);
            res.status(500).send("Erro interno ao salvar o resultado.");
        });
}

// Controller: buscarDesempenho
// Identifica o usuário pelo token da sessão e busca o resumo de desempenho
// usado nas KPIs da dashboard (pontuação total, acertos, porcentagem e quizzes).
function buscarDesempenho(req, res) {
    var token = req.headers["x-access-token"];
    var usuario = usuarioController.obterUsuarioPorToken(token);

    if (usuario == null) {
        res.status(401).send("Sessão inválida. Faça login novamente.");
        return;
    }

    quizModel.buscarDesempenho(usuario.id)
        .then(function (resultado) {
            var desempenho = resultado[0] || {};

            // Converte os valores para número e usa zero quando não houver tentativas.
            res.status(200).json({
                pontuacao_total: Number(desempenho.pontuacao_total) || 0,
                total_de_acertos: Number(desempenho.total_de_acertos) || 0,
                percentual_geral: Number(desempenho.percentual_geral) || 0,
                quizzes_concluidos: Number(desempenho.quizzes_concluidos) || 0
            });
        })
        .catch(function (erro) {
            console.log("Erro ao buscar o desempenho do usuário: ", erro.message);
            res.status(500).send("Erro interno ao buscar o desempenho.");
        });
}

// Controller: buscarRanking
// Busca o ranking de usuarios com melhor desempenho nos quizzes (top 3).
function buscarRanking(req, res) {
    var token = req.headers["x-access-token"];
    var usuario = usuarioController.obterUsuarioPorToken(token);

    if (usuario == null) {
        res.status(401).send("Sessão inválida. Faça login novamente.");
        return;
    }

    quizModel.buscarRanking().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log("Erro ao buscar o ranking: ", erro.message);
        res.status(500).send("Erro interno ao buscar o ranking.");
    });
}

// Controller: buscarMaiorPontuacao
function buscarMaiorPontuacao(req, res) {
    quizModel.buscarMaiorPontuacaoPorQuiz().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log("Erro ao buscar maior pontuação por quiz: ", erro.message);
        res.status(500).send("Erro interno ao buscar maior pontuação.");
    });
}

// Controller: buscarPosicaoUsuario
function buscarPosicaoUsuario(req, res) {
    var token = req.headers["x-access-token"];
    var usuario = usuarioController.obterUsuarioPorToken(token);

    if (usuario == null) {
        res.status(401).send("Sessão inválida. Faça login novamente.");
        return;
    }

    quizModel.buscarPosicaoUsuario(usuario.id).then(function (resultado) {
        var dados = resultado[0] || { posicao: null, pontuacao_total: 0 };
        res.status(200).json(dados);
    }).catch(function (erro) {
        console.log("Erro ao buscar posição do usuário: ", erro.message);
        res.status(500).send("Erro interno ao buscar posição do usuário.");
    });
}

module.exports = {
    salvar_resultado,
    buscarDesempenho,
    buscarRanking
    ,
    buscarMaiorPontuacao,
    buscarPosicaoUsuario
};
