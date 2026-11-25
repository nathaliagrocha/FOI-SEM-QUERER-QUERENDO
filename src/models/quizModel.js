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
        WHERE id_quiz = ${id_quiz};
    `;
    return database.executar(instrucaoSql);
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
        WHERE id_usuario = ${id_usuario};
    `;
    return database.executar(instrucaoSql);
}

// Model: buscarRanking
// Busca o ranking de usuarios com a maior pontuacao em cada quiz (top 3).
// Para cada usuario, considera apenas a maior pontuacao de cada quiz e soma esses valores.
function buscarRanking() {
    var instrucaoSql = `
        SELECT
            u.id AS idUsuario,
            u.nome AS nomeUsuario,
            SUM(tentativas_melhores.maior_pontuacao) AS pontuacao_total
        FROM (
            SELECT
                t.id_usuario,
                MAX(t.pontuacao) AS maior_pontuacao
            FROM tentativa_quiz t
            GROUP BY t.id_usuario, t.id_quiz
        ) AS tentativas_melhores
        INNER JOIN usuario u ON tentativas_melhores.id_usuario = u.id
        GROUP BY u.id, u.nome
        ORDER BY pontuacao_total DESC
        LIMIT 3;
    `;
    return database.executar(instrucaoSql);
}

// Model: buscarMaiorPontuacaoPorQuiz
// Busca a maior pontuação de cada quiz realizado pelo usuário informado.
function buscarMaiorPontuacaoPorQuiz(id_usuario) {
    var instrucaoSql = `
        SELECT q.id_quiz AS quiz_id, q.nome AS titulo, MAX(t.pontuacao) AS maior_pontuacao
        FROM quiz q
        INNER JOIN tentativa_quiz t ON t.id_quiz = q.id_quiz AND t.id_usuario = ${id_usuario}
        GROUP BY q.id_quiz, q.nome
        ORDER BY q.id_quiz;
    `;
    return database.executar(instrucaoSql);
}

// Model: buscarPosicaoUsuario
// Busca a posicao do usuario no ranking, considerando apenas a maior pontuacao
// de cada quiz como pontuacao final do usuario.
function buscarPosicaoUsuario(id_usuario) {
    var instrucaoSql = `
        SELECT
            (
                1 + (
                    SELECT COUNT(*)
                    FROM (
                        SELECT u2.id AS id_usuario, SUM(m2.maior_pontuacao) AS total_pontuacao
                        FROM (
                            SELECT t.id_usuario, MAX(t.pontuacao) AS maior_pontuacao
                            FROM tentativa_quiz t
                            GROUP BY t.id_usuario, t.id_quiz
                        ) m2
                        INNER JOIN usuario u2 ON m2.id_usuario = u2.id
                        GROUP BY u2.id, u2.nome
                    ) AS todos
                    WHERE todos.total_pontuacao > (
                        SELECT SUM(m3.maior_pontuacao)
                        FROM (
                            SELECT t.id_usuario, MAX(t.pontuacao) AS maior_pontuacao
                            FROM tentativa_quiz t
                            WHERE t.id_usuario = ${id_usuario}
                            GROUP BY t.id_usuario, t.id_quiz
                        ) m3
                    )
                )
            ) AS posicao,
            (
                SELECT SUM(m4.maior_pontuacao)
                FROM (
                    SELECT t.id_usuario, MAX(t.pontuacao) AS maior_pontuacao
                    FROM tentativa_quiz t
                    WHERE t.id_usuario = ${id_usuario}
                    GROUP BY t.id_usuario, t.id_quiz
                ) m4
            ) AS pontuacao_total;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    salvar_resultado,
    buscarPorId,
    buscarDesempenho,
    buscarRanking,
    buscarMaiorPontuacaoPorQuiz,
    buscarPosicaoUsuario
};
