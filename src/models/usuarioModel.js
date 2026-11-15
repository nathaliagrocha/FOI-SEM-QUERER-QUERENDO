var database = require("../database/config")

// Model: autenticar
// Busca o usuário por email e senha usando parâmetros (?) para evitar SQL Injection.
// O BINARY faz a senha ser comparada exatamente, diferenciando maiúsculas de minúsculas.
// A senha nunca é registrada no console.
function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = ? AND senha = BINARY ?;
    `;
    return database.executar(instrucaoSql, [email, senha]);
}

// Model: cadastrar
// Insere um novo usuário na tabela 'usuario' usando parâmetros (?) para evitar SQL Injection.
function cadastrar(nome, email, senha) {
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?);
    `;
    return database.executar(instrucaoSql, [nome, email, senha]);
}

module.exports = {
    autenticar,
    cadastrar
};
