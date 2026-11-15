CREATE DATABASE chaves;

USE chaves;

-- TABELA PARA INSERÇÃO DE CADASTRO E CONSULTA PARA LOGIN
CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR (100),
senha VARCHAR(255)
);

-- TABELA QUE ARMAZENA A QUANTIDADE DE ACERTOS QUE TEVE POR QUESTÃO, O TOTAL DE ACERTOS EM TODO QUIZ E A QUANTIDADE DE VEZES QUE O QUIZ FOI REALIZADO
CREATE TABLE quiz(
id INT PRIMARY KEY AUTO_INCREMENT,
acertosQuestao INT,
totalAcertos INT,
qtdQuiz INT,
fk_usuario INT,
FOREIGN KEY (fk_usuario) REFERENCES usuario (id)
);

-- TABELA QUE ARMAZENA O RESULTADO DE CADA TENTATIVA EM CADA QUIZ
CREATE TABLE resultado_quiz(
id INT PRIMARY KEY AUTO_INCREMENT,
fk_usuario INT NOT NULL,
numero_quiz INT NOT NULL,
total_acertos INT NOT NULL,
total_questoes INT NOT NULL,
pontuacao DECIMAL(5,2) NOT NULL DEFAULT 0,
data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (fk_usuario) REFERENCES usuario (id)
);

-- Para um banco que já existe, execute apenas o ALTER abaixo para adicionar a pontuação:
-- ALTER TABLE resultado_quiz ADD COLUMN pontuacao DECIMAL(5,2) NOT NULL DEFAULT 0;

-- Observações:
-- senha é VARCHAR(255) para permitir textos maiores.
-- Recomendação para a próxima etapa: guardar um hash da senha (nunca a senha em texto puro) e usar uma biblioteca própria para isso.
