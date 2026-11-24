CREATE DATABASE chaves;

USE chaves;
select * from usuario;
-- TABELA PARA INSERÇÃO DE CADASTRO E CONSULTA PARA LOGIN
CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR (100),
senha INT 
);

CREATE TABLE quiz (
    id_quiz INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    total_questoes INT NOT NULL,
    pontuacao_maxima DECIMAL(8,2) NOT NULL
);

CREATE TABLE tentativa_quiz (
    id_tentativa INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_quiz INT NOT NULL,
    acertos INT NOT NULL,
    total_questoes INT NOT NULL,
    pontuacao DECIMAL(8,2) NOT NULL,

    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_quiz) REFERENCES quiz(id_quiz)
);

select * from usuario;

   SELECT
            u.id AS idUsuario,
            u.nome AS nomeUsuario,
            ROUND(AVG(t.pontuacao), 2) AS media_pontuacao,
            SUM(t.acertos) AS total_acertos
        FROM tentativa_quiz t
        INNER JOIN usuario u ON t.id_usuario = u.id
        GROUP BY u.id, u.nome
        ORDER BY media_pontuacao DESC, total_acertos DESC
        LIMIT 3;
        