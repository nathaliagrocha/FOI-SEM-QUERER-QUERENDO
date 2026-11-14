var database = require("../database/config");

// Model: listar
// Seleciona avisos com dados do usuário (join com usuario)
function listar() {
    console.log("ACESSEI O AVISO  MODEL - listar\n\n Se ocorrer 'Error: connect ECONNREFUSED', verifique o DB e credenciais.");
    var instrucaoSql = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Model: pesquisarDescricao
// Busca avisos cujo texto da descrição case com o parâmetro (LIKE)
function pesquisarDescricao(texto) {
    console.log("ACESSEI O AVISO MODEL - pesquisarDescricao\n\n Se ocorrer 'Error: connect ECONNREFUSED', verifique o DB e credenciais.");
    var instrucaoSql = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE a.descricao LIKE '${texto}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Model: listarPorUsuario
// Retorna avisos filtrados pelo id do usuário
function listarPorUsuario(idUsuario) {
    console.log("ACESSEI O AVISO MODEL - listarPorUsuario\n\n Se ocorrer 'Error: connect ECONNREFUSED', verifique o DB e credenciais.");
    var instrucaoSql = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE u.id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Model: publicar
// Insere novo aviso associado a um usuário
function publicar(titulo, descricao, idUsuario) {
    console.log("ACESSEI O AVISO MODEL - publicar\n\n Se ocorrer 'Error: connect ECONNREFUSED', verifique o DB e credenciais.", titulo, descricao, idUsuario);
    var instrucaoSql = `
        INSERT INTO aviso (titulo, descricao, fk_usuario) VALUES ('${titulo}', '${descricao}', ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Model: editar
// Atualiza a descrição de um aviso pelo id
function editar(novaDescricao, idAviso) {
    console.log("ACESSEI O AVISO MODEL - editar\n\n Se ocorrer 'Error: connect ECONNREFUSED', verifique o DB e credenciais.", novaDescricao, idAviso);
    var instrucaoSql = `
        UPDATE aviso SET descricao = '${novaDescricao}' WHERE id = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Model: deletar
// Remove um aviso pelo id
function deletar(idAviso) {
    console.log("ACESSEI O AVISO MODEL - deletar\n\n Se ocorrer 'Error: connect ECONNREFUSED', verifique o DB e credenciais.", idAviso);
    var instrucaoSql = `
        DELETE FROM aviso WHERE id = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    publicar,
    editar,
    deletar
}
