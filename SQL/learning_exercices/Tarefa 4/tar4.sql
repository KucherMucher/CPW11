/*
  3) Perguntas obrigatórias (compreensão)
    Responde por palavras tuas:
      
    1. Qual é a chave primária da tabela categoria e porquê?
      - é id_categoria porque depois deste atributo segue comandos INTEGER PRIMARY KEY, onde PRIMARY KEY significa chave primaria

    2. Qual é a chave primária da tabela item e porquê?
      - é id_item porque depois deste atributo segue comandos INTEGER PRIMARY KEY, onde PRIMARY KEY significa chave primaria

    3. O que significa FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)?
      - FOREIGN KEY (id_categoria) significa a criação de chave estrangeira e depois REFERENCES categoria(id_categoria) liga essa chave estrangeira a chave primaria da tabela categoria

    4. Qual é a diferença entre WHERE e ORDER BY?
      - WHERE é uma ordenação de itens 
    5. Se apagares uma categoria, o que pode acontecer aos itens que pertencem a essa categoria? (resposta conceptual)

*/



/*-- Tabela de Classificação
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
); */

/*
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
*/

/*-- Ver tudo
SELECT * FROM categoria;
SELECT * FROM item; */

/* -- Filtrar (WHERE)
SELECT * FROM item WHERE id_categoria = 1;

-- Ordenar (ORDER BY)
SELECT * FROM item ORDER BY ano DESC; */