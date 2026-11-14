CREATE DATABASE chaves;

USE chaves;

-- TABELA PARA INSERÇÃO DE CADASTRO E CONSULTA PARA LOGIN
CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR (100),
senha INT 
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
-- senha está definida como INT no script original; normalmente deveria ser VARCHAR (hash) para suportar textos
-- Caso prefira, altere para VARCHAR(255) e armazene hashes seguros em produção.
