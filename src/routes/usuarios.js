var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

// Rota POST /cadastrar
// Recebe dados de cadastro do frontend (formulário) e delega para o controller
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

// Rota POST /autenticar
// Recebe email e senha do frontend e chama a lógica de autenticação no controller
router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

// Rota GET /sessao
// Confere no servidor o usuário logado e retorna os dados da sessão
router.get("/sessao", function (req, res) {
    usuarioController.validarSessao(req, res);
});

module.exports = router;
