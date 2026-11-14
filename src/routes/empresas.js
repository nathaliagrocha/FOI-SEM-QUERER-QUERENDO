var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

// Rota POST /cadastrar - cria nova empresa
router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
})

// Rota GET /buscar?cnpj=... - procura por CNPJ
router.get("/buscar", function (req, res) {
    empresaController.buscarPorCnpj(req, res);
});

// Rota GET /buscar/:id - busca por id
router.get("/buscar/:id", function (req, res) {
  empresaController.buscarPorId(req, res);
});

// Rota GET /listar - retorna todas as empresas
router.get("/listar", function (req, res) {
  empresaController.listar(req, res);
});

module.exports = router;
