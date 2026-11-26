CREATE DATABASE chaves;

USE chaves;

-- TABELA PARA INSERÇÃO DE CADASTRO E CONSULTA PARA LOGIN
CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR (100) unique,
senha VARCHAR(255)
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

    data_realizacao DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_quiz) REFERENCES quiz(id_quiz)
);

-- View para ranking: soma a maior pontuação por quiz de cada usuário
CREATE VIEW vw_ranking AS
SELECT
    u.id AS idUsuario,
    u.nome AS nomeUsuario,
    SUM(m.maior_pontuacao) AS pontuacao_total
FROM (
    SELECT t.id_usuario, MAX(t.pontuacao) AS maior_pontuacao
    FROM tentativa_quiz t
    GROUP BY t.id_usuario, t.id_quiz
) m
INNER JOIN usuario u ON m.id_usuario = u.id
GROUP BY u.id, u.nome;

-- View vw_quiz: informações básicas do quiz
CREATE VIEW vw_quiz AS
SELECT id_quiz, nome, total_questoes, pontuacao_maxima
FROM quiz;

-- View vw_desempenho_usuario: resumo de desempenho por usuário
CREATE VIEW vw_desempenho_usuario AS
SELECT
    t.id_usuario AS id_usuario,
    COALESCE(SUM(t.pontuacao), 0) AS pontuacao_total,
    COALESCE(SUM(t.acertos), 0) AS total_de_acertos,
    CASE
        WHEN SUM(t.total_questoes) > 0 THEN ROUND(SUM(t.acertos) / SUM(t.total_questoes) * 100, 2)
        ELSE 0
    END AS percentual_geral,
    COUNT(*) AS quizzes_concluidos
FROM tentativa_quiz t
GROUP BY t.id_usuario;

-- View vw_maior_pontuacao_por_quiz: maior pontuação por quiz por usuário
CREATE VIEW vw_maior_pontuacao_por_quiz AS
SELECT
    t.id_usuario AS id_usuario,
    q.id_quiz AS quiz_id,
    q.nome AS titulo,
    MAX(t.pontuacao) AS maior_pontuacao
FROM tentativa_quiz t
INNER JOIN quiz q ON t.id_quiz = q.id_quiz
GROUP BY t.id_usuario, q.id_quiz, q.nome;

-- View vw_posicao_usuario: posição e pontuação total do usuário no ranking
CREATE VIEW vw_posicao_usuario AS
SELECT
    u.id AS id_usuario,
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
                    GROUP BY t.id_usuario, t.id_quiz
                ) m3
                WHERE m3.id_usuario = u.id
            )
        )
    ) AS posicao,
    (
        SELECT SUM(m4.maior_pontuacao)
        FROM (
            SELECT t.id_usuario, MAX(t.pontuacao) AS maior_pontuacao
            FROM tentativa_quiz t
            GROUP BY t.id_usuario, t.id_quiz
        ) m4
        WHERE m4.id_usuario = u.id
    ) AS pontuacao_total
FROM usuario u;

-- Ver views existentes:
SHOW FULL TABLES WHERE TABLE_TYPE = 'VIEW';

select * from usuario;
select * from tentativa_quiz;
select * from quiz;

drop table usuario;
drop table quiz;
drop table tentativa_quiz;

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE tentativa_quiz;
TRUNCATE TABLE quiz;
TRUNCATE TABLE usuario;

SET FOREIGN_KEY_CHECKS = 1;