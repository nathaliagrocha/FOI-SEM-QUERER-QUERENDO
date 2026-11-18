const base = "http://localhost:3333";

async function postRota(rota, corpo, token) {
    const headers = { "Content-Type": "application/json" };
    if (token) {
        headers["x-access-token"] = token;
    }
    const resposta = await fetch(base + rota, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(corpo)
    });
    const texto = await resposta.text();
    let json = null;
    try { json = JSON.parse(texto); } catch (e) { /* mantém texto */ }
    return { status: resposta.status, corpo: json, texto: texto };
}

async function main() {
    console.log("TESTE E2E: Autenticar para obter token");
    const rLogin = await postRota("/usuarios/autenticar", { emailServer: "teste_quiz_1794966146031@gmail.com", senhaServer: "12345678" });
    console.log("STATUS LOGIN:", rLogin.status, "TOKEN:", rLogin.corpo && rLogin.corpo.token ? "OK" : "FALHOU");
    const token = rLogin.corpo && rLogin.corpo.token;

    console.log("\nTESTE E2E 1: Quiz 1 com 15 acertos (esperado 201 e pontuacao 75)");
    let r = await postRota("/quizzes/resultado", { numero_quiz: 1, total_acertos: 15 }, token);
    console.log("STATUS:", r.status, "CORPO:", JSON.stringify(r.corpo));

    console.log("\nTESTE E2E 2: Quiz 2 com 18 acertos (esperado 201 e pontuacao 90)");
    r = await postRota("/quizzes/resultado", { numero_quiz: 2, total_acertos: 18 }, token);
    console.log("STATUS:", r.status, "CORPO:", JSON.stringify(r.corpo));

    console.log("\nTESTE E2E 3: Quiz 3 com 10 acertos (esperado 201 e pontuacao ~76,92)");
    r = await postRota("/quizzes/resultado", { numero_quiz: 3, total_acertos: 10 }, token);
    console.log("STATUS:", r.status, "CORPO:", JSON.stringify(r.corpo));

    process.exit(0);
}

main();
