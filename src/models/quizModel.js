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

// Model: buscarDesempenho
// Busca o resumo de desempenho do usuário nos quizzes (usado nas KPIs da dashboard).
// Soma as tentativas do usuário na tabela 'tentativa_quiz'.
function buscarDesempenho(id_usuario) {
    var instrucaoSql = `
        SELECT
            COALESCE(SUM(pontuacao), 0) AS pontuacao_total,
            COALESCE(SUM(acertos), 0) AS total_de_acertos,
            CASE
                WHEN SUM(total_questoes) > 0 THEN ROUND(SUM(acertos) / SUM(total_questoes) * 100, 2)
                ELSE 0
            END AS percentual_geral,
            COUNT(*) AS quizzes_concluidos
        FROM tentativa_quiz
        WHERE id_usuario = ?;
    `;
    return database.executar(instrucaoSql, [id_usuario]);
}

module.exports = {
    salvar_resultado,
    buscarPorId,
    buscarDesempenho
};
