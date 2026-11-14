var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/avisoController");

// Rota GET /listar - retorna todos os avisos
router.get("/listar", function (req, res) {
    avisoController.listar(req, res);
});

// Rota GET /listar/:idUsuario - retorna avisos de um usuário específico
router.get("/listar/:idUsuario", function (req, res) {
    avisoController.listarPorUsuario(req, res);
});

// Rota GET /pesquisar/:descricao - busca por descrição (LIKE)
router.get("/pesquisar/:descricao", function (req, res) {
    avisoController.pesquisarDescricao(req, res);
});

// Rota POST /publicar/:idUsuario - publica um novo aviso para o usuário
router.post("/publicar/:idUsuario", function (req, res) {
    avisoController.publicar(req, res);
});

// Rota PUT /editar/:idAviso - edita descrição do aviso
router.put("/editar/:idAviso", function (req, res) {
    avisoController.editar(req, res);
});

// Rota DELETE /deletar/:idAviso - remove o aviso
router.delete("/deletar/:idAviso", function (req, res) {
    avisoController.deletar(req, res);
});

module.exports = router;
