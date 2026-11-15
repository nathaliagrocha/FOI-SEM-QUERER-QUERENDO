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

-- Observações:
-- senha é VARCHAR(255) para permitir textos maiores.
-- Recomendação para a próxima etapa: guardar um hash da senha (nunca a senha em texto puro) e usar uma biblioteca própria para isso.
