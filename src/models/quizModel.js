var database = require("../database/config")

// Model: salvar_resultado
// Insere uma tentativa do quiz usando parâmetros (?) para evitar SQL Injection.
// O total de questões e a pontuação são definidos no servidor, e não pelo navegador.
function salvar_resultado(fk_usuario, numero_quiz, total_acertos, total_questoes, pontuacao) {
    var instrucaoSql = `
        INSERT INTO resultado_quiz (fk_usuario, numero_quiz, total_acertos, total_questoes, pontuacao)
        VALUES (?, ?, ?, ?, ?);
    `;
    return database.executar(instrucaoSql, [
        fk_usuario,
        numero_quiz,
        total_acertos,
        total_questoes,
        pontuacao
    ]);
}

module.exports = {
    salvar_resultado
};
