var database = require("../database/config")

// Model: salvar_resultado
// Insere uma tentativa do quiz usando parâmetros (?) para evitar SQL Injection.
// O total de questões e a pontuação são definidos no servidor, e não pelo navegador.
function salvar_resultado(id_usuario, id_quiz, acertos, total_questoes, pontuacao) {
    var instrucaoSql = `
        INSERT INTO tentativa_quiz (id_usuario, id_quiz, acertos, total_questoes, pontuacao)
        VALUES (?, ?, ?, ?, ?);
    `;
    return database.executar(instrucaoSql, [
        id_usuario,
        id_quiz,
        acertos,
        total_questoes,
        pontuacao
    ]);
}

// Model: buscarPorId
// Busca um quiz pelo id na tabela 'quiz' para saber o total de questões e a pontuação máxima.
function buscarPorId(id_quiz) {
    var instrucaoSql = `
        SELECT id_quiz, nome, total_questoes, pontuacao_maxima
        FROM quiz
        WHERE id_quiz = ?;
    `;
    return database.executar(instrucaoSql, [id_quiz]);
}

module.exports = {
    salvar_resultado,
    buscarPorId
};
