
ALTER TABLE tbl_utilizadores
DROP COLUMN passorde,
ADD COLUMN`pass worde` varchar(100) AFTER localidade;

ALTER TABLE tbl_prestadores
ADD COLUMN disponivel boolean not null AFTER preco_hora

