var crypto = require("crypto");
var database = require("../database/config")

// Model: autenticar
// Busca o usuário por email e compara a senha enviada com o hash salvo no banco.
// O hash é feito com scrypt (salt + hash) para não guardar a senha em texto puro.
// A comparação usa parâmetros (?) para evitar SQL Injection.
function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id, nome, email, senha FROM usuario WHERE email = ?;
    `;
    return database.executar(instrucaoSql, [email])
        .then(function (resultado) {
            var usuario = resultado[0];

            // Se não encontrar o usuário ou a senha não bater, retorna lista vazia.
            if (usuario == undefined || !validarSenha(senha, usuario.senha)) {
                return [];
            }

            return [usuario];
        });
}

// Model: cadastrar
// Insere um novo usuário na tabela 'usuario' usando parâmetros (?) para evitar SQL Injection.
// A senha salva é um hash (salt + hash) gerado com scrypt, e não a senha em texto puro.
function cadastrar(nome, email, senha) {
    var hash = gerarHash(senha);
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?);
    `;
    return database.executar(instrucaoSql, [nome, email, hash]);
}

// Função gerarHash
// Gera o hash da senha com um salt aleatório (scrypt) para salvar no banco.
function gerarHash(senha) {
    var salt = crypto.randomBytes(16);
    var hash = crypto.scryptSync(senha, salt, 64);
    return salt.toString("hex") + ":" + hash.toString("hex");
}

// Função validarSenha
// Compara a senha enviada com o hash salvo usando o mesmo salt.
function validarSenha(senha, hashSalvo) {
    var partes = hashSalvo.split(":");
    var salt = Buffer.from(partes[0], "hex");
    var hash = crypto.scryptSync(senha, salt, 64);
    return hash.toString("hex") === partes[1];
}

module.exports = {
    autenticar,
    cadastrar
};
