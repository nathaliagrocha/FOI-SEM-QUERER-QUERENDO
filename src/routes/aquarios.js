var express = require("express");
var router = express.Router();

var aquarioController = require("../controllers/aquarioController");

// Rota GET /:empresaId - retorna aquários de uma empresa
router.get("/:empresaId", function (req, res) {
  aquarioController.buscarAquariosPorEmpresa(req, res);
});

// Rota POST /cadastrar - cria novo aquário
router.post("/cadastrar", function (req, res) {
  aquarioController.cadastrar(req, res);
})

module.exports = router;
