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

// Model: buscarRanking
// Busca o ranking de usuarios com melhor desempenho nos quizzes (top 3).
function buscarRanking() {
    var instrucaoSql = `
        SELECT
            u.id AS idUsuario,
            u.nome AS nomeUsuario,
            ROUND(AVG(t.pontuacao), 2) AS media_pontuacao,
            SUM(t.pontuacao) AS pontuacao_total
        FROM tentativa_quiz t
        INNER JOIN usuario u ON t.id_usuario = u.id
        GROUP BY u.id, u.nome
        ORDER BY pontuacao_total DESC
        LIMIT 3;
    `;
    return database.executar(instrucaoSql);
}

// Model: buscarMaiorPontuacaoPorQuiz
function buscarMaiorPontuacaoPorQuiz() {
    var instrucaoSql = `
        SELECT q.id_quiz AS quiz_id, q.nome AS titulo, COALESCE(MAX(t.pontuacao),0) AS maior_pontuacao
        FROM quiz q
        LEFT JOIN tentativa_quiz t ON t.id_quiz = q.id_quiz
        GROUP BY q.id_quiz, q.nome
        ORDER BY q.id_quiz;
    `;
    return database.executar(instrucaoSql);
}

// Model: buscarPosicaoUsuario
function buscarPosicaoUsuario(id_usuario) {
    var instrucaoSql = `
        SELECT posicao, pontuacao_total FROM (
            SELECT u.id AS usuario_id, IFNULL(SUM(t.pontuacao),0) AS pontuacao_total,
                (SELECT 1 + COUNT(*) FROM (
                    SELECT u2.id, IFNULL(SUM(t2.pontuacao),0) AS pt FROM usuario u2
                    LEFT JOIN tentativa_quiz t2 ON t2.id_usuario = u2.id
                    GROUP BY u2.id
                    HAVING pt > IFNULL(SUM(t.pontuacao),0)
                ) AS s) AS posicao
            FROM usuario u
            LEFT JOIN tentativa_quiz t ON t.id_usuario = u.id
            GROUP BY u.id
        ) AS ranking WHERE usuario_id = ?;
    `;
    return database.executar(instrucaoSql, [id_usuario]);
}

module.exports = {
    salvar_resultado,
    buscarPorId,
    buscarDesempenho,
    buscarRanking
    ,
    buscarMaiorPontuacaoPorQuiz,
    buscarPosicaoUsuario
};
