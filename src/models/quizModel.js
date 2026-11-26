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
        FROM vw_quiz
        WHERE id_quiz = ${id_quiz};
    `;
    return database.executar(instrucaoSql);
}

// Model: buscarDesempenho
// Busca o resumo de desempenho do usuário nos quizzes (usado nas KPIs da dashboard).
// Soma as tentativas do usuário na tabela 'tentativa_quiz'.
function buscarDesempenho(id_usuario) {
    var instrucaoSql = `
        SELECT pontuacao_total, total_de_acertos, percentual_geral, quizzes_concluidos
        FROM vw_desempenho_usuario
        WHERE id_usuario = ${id_usuario};
    `;
    return database.executar(instrucaoSql);
}

// Model: buscarRanking
// Busca o ranking de usuarios com a maior pontuacao em cada quiz (top 3).
// Para cada usuario, considera apenas a maior pontuacao de cada quiz e soma esses valores.
function buscarRanking() {
    // Ler a partir da view vw_ranking (criada no script do banco)
    var instrucaoSql = `
        SELECT idUsuario, nomeUsuario, pontuacao_total
        FROM vw_ranking
        ORDER BY pontuacao_total DESC
        LIMIT 3;
    `;
    return database.executar(instrucaoSql);
}

// Model: buscarMaiorPontuacaoPorQuiz
// Busca a maior pontuação de cada quiz realizado pelo usuário informado.
function buscarMaiorPontuacaoPorQuiz(id_usuario) {
    var instrucaoSql = `
        SELECT quiz_id, titulo, maior_pontuacao
        FROM vw_maior_pontuacao_por_quiz
        WHERE id_usuario = ${id_usuario}
        ORDER BY quiz_id;
    `;
    return database.executar(instrucaoSql);
}

// Model: buscarPosicaoUsuario
// Busca a posicao do usuario no ranking, considerando apenas a maior pontuacao
// de cada quiz como pontuacao final do usuario.
function buscarPosicaoUsuario(id_usuario) {
    var instrucaoSql = `
        SELECT posicao, pontuacao_total
        FROM vw_posicao_usuario
        WHERE id_usuario = ${id_usuario};
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
