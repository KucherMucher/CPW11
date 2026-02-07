/*
-- Tabela de Classificação
CREATE TABLE categoria (
  id_categoria INTEGER PRIMARY KEY,
  nome TEXT NOT NULL
);

-- Tabela Principal
CREATE TABLE item (
  id_item INTEGER PRIMARY KEY,
  titulo TEXT NOT NULL,
  ano INTEGER,
  id_categoria INTEGER NOT NULL,
  FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
); 


INSERT INTO categoria (id_categoria, nome) VALUES
(1, 'Ação'),
(2, 'Aventura'),
(3, 'Drama'),
(4, 'Comédia');

INSERT INTO item (id_item, titulo, ano, id_categoria) VALUES
(1, 'Exemplo 1', 2020, 1),
(2, 'Exemplo 2', 2022, 2),
(3, 'Exemplo 3', 2019, 3),
(4, 'Exemplo 4', 2021, 1);


-- DELETE FROM categoria WHERE id_categoria = 1;

-- Ver tudo
SELECT * FROM categoria;
SELECT * FROM item; 

*/

-- Filtrar (WHERE)
SELECT * FROM item WHERE id_categoria = 1;

-- Ordenar (ORDER BY)
SELECT * FROM item ORDER BY ano DESC; 