var express = require("express");
var router = express.Router();

// Rota raiz - renderiza a view 'index' (se existir engine configurada)
router.get("/", function (req, res) {
    res.render("index");
});

module.exports = router;
