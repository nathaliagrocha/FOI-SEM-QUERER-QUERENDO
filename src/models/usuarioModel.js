var database = require("../database/config")

// Model: autenticar
// Busca o usuário por email e senha usando parâmetros (?) para evitar SQL Injection.
// A senha nunca é registrada no console.
function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = ? AND senha = ?;
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

// Model: buscarPorEmail
// Retorna usuários com o email informado (usado para verificar duplicidade)
function buscarPorEmail(email) {
    var instrucaoSql = `
        SELECT id, email FROM usuario WHERE email = ?;
    `;
    return database.executar(instrucaoSql, [email]);
}

module.exports = {
    autenticar,
    cadastrar
    , buscarPorEmail
};
