var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

// Rota POST /quizzes/resultado
// Recebe o número do quiz e a quantidade de acertos.
// O usuário é identificado pelo token enviado no cabeçalho x-access-token.
router.post("/resultado", function (req, res) {
    quizController.salvar_resultado(req, res);
});

module.exports = router;
