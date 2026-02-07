-- Tabela de Classificação

CREATE TABLE Tipo_Prova (
    id_tipo_prova INTEGER PRIMARY KEY,
    Tipo TEXT NOT NULL,
    tem_natacao TEXT NOT NULL,
    tem_ciclismo TEXT NOT NULL
);

-- Tabela Principal
CREATE TABLE Prova (
    id_prova INTEGER PRIMARY KEY,
    id_tipo_prova INTEGER NOT NULL,
    Nome_Da_Prova TEXT NOT NULL,
    D_natacao TEXT NOT NULL,
    D_ciclismo TEXT NOT NULL,
    D_corrida TEXT NOT NULL,
    FOREIGN KEY (id_tipo_prova) REFERENCES Tipo_Prova(id_tipo_prova)
);

-- Tabela Dependente

CREATE TABLE Atleta (
    id_atleta INTEGER PRIMARY KEY,
    id_prova INTEGER NOT NULL,
    Nome TEXT NOT NULL,
    T_total TEXT NOT NULL,
    Equipa TEXT NOT NULL,
    FOREIGN KEY (id_prova) REFERENCES Prova(id_prova)
);

-- criar tabela

INSERT INTO Tipo_Prova (id_tipo_prova, Tipo, tem_natacao, tem_ciclismo) VALUES
(1, 'Triatlo', 'Sim', 'Sim'),
(2, 'Duatlo', 'Não', 'Sim'),
(3, 'Aquatlo', 'Sim', 'Não');

INSERT INTO Prova (id_prova, id_tipo_prova, Nome_Da_Prova, D_natacao, D_ciclismo, D_corrida) VALUES
(1, 1, 'V Triatlo de Santo André', '750m', '20.000m', '5.000m'),
(2, 1, 'XXI Triatlo Monte Gordo', '750m', '19.400m', '5.000m'),
(3, 2, 'XVIII Duatlo de Arronches', '-', '20.250m', '5.150m + 2.500m'),
(4, 3, 'II Aquatlo de Mação', '750m', '-', '4.800m'),
(5, 1, 'XXIV Triatlo de Cidade Quarteira', '750m', '20.000m', '5.000m'),
(6, 1, 'III Triatlo da Casconha', '750m', '17.000m', '5.000m'),
(7, 1, 'III Triatlo das Caldas da Rainha', '750m', '20.000m', '5.000m'),
(8, 1, 'VI Aquatlo da Amora – CN Clubes Triatlo Contrarrelógio Equipas', '750m', '19.500m', '5.000m'),
(9, 2, 'XVI Duatlo Cross João Campos', '-', '19.900m', '4.800m + 2.700m'),
(10, 2, 'IX Duatlo de Fátima', '-', '19.400m', '4.800m + 2.500m'),
(11, 3, 'VI Aquatlo da Amora', '750m', '-', '5.000m'),
(12, 1, 'IV Triatlo de Sesimbra', '750m', '19.800m', '5000m');

INSERT INTO Atleta (id_atleta, id_prova, Nome, T_total, Equipa) VALUES
(1, 5, 'Natalia Silva', '01:32:47', 'ACADÉMICA TRIATLO'),
(2, 8, 'Ana Sousa', '01:38:24', 'ACADÉMICA TRIATLO'),
(3, 2, 'Marta Silva', '02:01:03', 'ACADÉMICA TRIATLO'),
(4, 1, 'Leonardo Jerónimo', '01:03:47', 'ACADÉMICA TRIATLO'),
(5, 7, 'Rui Trovão', '01:16:28', 'ACADÉMICA TRIATLO'),
(6, 3, 'Rui Alexandre Domingues Silva', '01:18:14', 'ACADÉMICA TRIATLO'),
(7, 12, 'Nuno Silva', '01:10:19', 'BEST'),
(8, 4, 'Hugo Medeiros', '01:12:32', 'BEST'),
(9, 6, 'Mickael Matos', '01:15:47', 'BEST'),
(10, 2, 'Duarte Gomes', '01:13:45', 'FET-Fátima Escola de Triatlo'),
(11, 9, 'António Guedes', '01:16:35', 'FET-Fátima Escola de Triatlo'),
(12, 11, 'Illia Kucher', '01:18:06', 'FET-Fátima Escola de Triatlo'),
(13, 3, 'Pedro Andrade', '01:11:57', 'Clube de Triatlo do Fundão'),
(14, 10, 'Pedro Miguel Maurício', '01:19:30', 'Clube de Triatlo do Fundão'),
(15, 6, 'António Catarino', '01:21:10', 'Clube de Triatlo do Fundão'),
(16, 8, 'Rui Pereira', '01:19:02', 'Quitério TRIPENICHE'),
(17, 5, 'Miguel Baltazar', '01:21:10', 'Quitério TRIPENICHE'),
(18, 4, 'Paulo Renato Santos', '01:22:57', 'Quitério TRIPENICHE');


-- mostrar tabelas

SELECT * FROM Tipo_Prova;
SELECT * FROM Prova;
SELECT * FROM Atleta;

-- consultas

SELECT * FROM Prova WHERE id_tipo_prova = 1;
SELECT * FROM Atleta ORDER BY T_Total;
SELECT COUNT(*) FROM Atleta WHERE Equipa = 'FET-Fátima Escola de Triatlo';

SELECT Prova.id_prova, Tipo_Prova.Tipo, Prova.Nome_Da_Prova, Prova.D_natacao, Prova.D_ciclismo, Prova.D_corrida
FROM Prova
INNER JOIN Tipo_Prova ON Prova.id_tipo_prova = Tipo_Prova.id_tipo_prova;

SELECT Atleta.id_atleta, Prova.Nome_Da_Prova, Atleta.Nome, Atleta.T_total, Atleta.Equipa
FROM Atleta
INNER JOIN Prova ON Atleta.id_prova = Prova.id_prova;