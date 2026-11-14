var database = require("../database/config")

// Model: autenticar
// Monta e executa a query que busca usuário por email e senha
function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL - autenticar\n\n Se ocorrer 'Error: connect ECONNREFUSED', verifique o DB e credenciais.");
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Model: cadastrar
// Monta e executa a query para inserir um novo usuário na tabela 'usuario'
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL - cadastrar\n\n Se ocorrer 'Error: connect ECONNREFUSED', verifique o DB e credenciais.");
    
    // Query de inserção usando valores recebidos (atenção à SQL injection em ambientes reais)
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};
