var usuarioModel = require("../models/usuarioModel");

// Controller: autenticar
// Valida parâmetros recebidos e chama o model para verificar credenciais
function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // validações básicas de entrada
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        // chama o model que retorna uma Promise com os resultados da query
        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                    // se encontrar exatamente um usuário, retorna os dados básicos
                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        res.json({
                            id: resultadoAutenticar[0].id,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome
                        });

                    } else if (resultadoAutenticar.length == 0) {
                        // credenciais inválidas
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        // duplicidade de usuários com mesmo login/senha
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

// Controller: cadastrar
// Recebe dados do formulário de cadastro, valida e delega para o model inserir no DB
function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // validações simples de campos obrigatórios
    if (nome == undefined) {
        res.status(400).send("Seu nome está em branco!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está em branco!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está em branco!");
    } else {
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    // retorna o resultado da inserção para o frontend
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
};
