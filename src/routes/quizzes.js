var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

// Rota GET /quizzes/desempenho
// Retorna os KPIs de desempenho do usuário logado (via token na sessão).
router.get("/desempenho", function (req, res) {
    quizController.buscarDesempenho(req, res);
});

// Rota GET /quizzes/ranking
// Retorna o ranking de usuarios com melhor desempenho nos quizzes (top 3).
router.get("/ranking", function (req, res) {
    quizController.buscarRanking(req, res);
});

// Rota POST /quizzes/resultado
// Recebe o número do quiz e a quantidade de acertos.
// O usuário é identificado pelo token enviado no cabeçalho x-access-token.
router.post("/resultado", function (req, res) {
    quizController.salvar_resultado(req, res);
});

module.exports = router;
