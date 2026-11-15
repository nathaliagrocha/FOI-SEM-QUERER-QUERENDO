var mysql = require("mysql2");

// CONEXÃO DO BANCO MYSQL SERVER
var mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

// O segundo parâmetro (valores) é opcional.
// Quando informado, o mysql2 troca cada "?" da instrução pelos valores do array,
// evitando que o texto digitado pelo usuário seja interpretado como comando SQL.
function executar(instrucao, valores) {

    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlConfig);
        conexao.connect();

        function retorno(erro, resultados) {
            conexao.end();
            if (erro) {
                reject(erro);
            }
            console.log(resultados);
            resolve(resultados);
        }

        // Mantém funcionando as consultas antigas, que chamam executar apenas com a instrução.
        if (valores == undefined) {
            conexao.query(instrucao, retorno);
        } else {
            conexao.query(instrucao, valores, retorno);
        }
        conexao.on('error', function (erro) {
            // Evento de erro na conexão: loga a mensagem (não faz throw direto aqui)
            console.error("ERRO NO MySQL SERVER: ", erro.sqlMessage);
            return ("ERRO NO MySQL SERVER: ", erro.sqlMessage);
        });
    });
}

module.exports = {
    executar
};
