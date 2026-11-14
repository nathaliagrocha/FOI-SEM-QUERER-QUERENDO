var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");
// Rota para obter últimas medições (ex: para gráfico)
router.get("/ultimas/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

// Rota para obter a medição mais recente (tempo real)
router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;
