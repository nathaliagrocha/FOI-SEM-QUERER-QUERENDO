CREATE DATABASE chaves;

USE chaves;

-- TABELA PARA INSERÇÃO DE CADASTRO E CONSULTA PARA LOGIN
CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR (100),
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

