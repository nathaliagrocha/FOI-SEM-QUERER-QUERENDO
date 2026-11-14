var database = require("../database/config");

// Model: buscarUltimasMedidas
// Monta query para obter as últimas medições (temperatura e momento) de um aquário
function buscarUltimasMedidas(idAquario, limite_linhas) {

    var instrucaoSql = `SELECT 
                        temperatura,
                        momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    FROM medida
                    WHERE fk_aquario = ${idAquario}
                    ORDER BY id DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Model: buscarMedidasEmTempoReal
// Retorna a última medição registrada para um aquário (usado em updates em tempo real)
function buscarMedidasEmTempoReal(idAquario) {

    var instrucaoSql = `SELECT 
                        temperatura,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        FROM medida WHERE fk_aquario = ${idAquario} 
                    ORDER BY id DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
