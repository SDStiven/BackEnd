use servidor_local;

ALTER TABLE tbl_prestadores
DROP COLUMN taxaUrgencia,
ADD COLUMN taxa_urgencia DECIMAL (10,3) AFTER profissao,
DROP COLUMN minimoDesconto,
ADD COLUMN minimo_desconto DECIMAL (10,3) AFTER taxa_urgencia,
DROP COLUMN persentagemDesconto,
ADD COLUMN persentagem_desconto DECIMAL (10,3) AFTER minimo_desconto,
DROP COLUMN precoHpra;

CREATE Table table_utilizadores (
	id varchar(255)  not null primary key not null,
	nome varchar(50)  not null ,
	numerar varchar(100)  not null ,
	data_nascemento date  not null ,
	emai  varchar (100)  not null ,
	telefone varchar(13)  not null ,
	pais varchar(100)   not null ,
	localidade varchar(100)  not null ,
	`passorde` varchar (100)  not null ,
	enabled boolean  not null ,
	created_at datetime  not null ,
	update_at datetime  not null 
);


CREATE Table table_Servicos  (
	id integer (255)primary key not null auto_increment,
	nome varchar (50) not null ,
	descrição varchar(20),
	categoria varchar (20)not null ,
	enabled boolean  not null ,
	create_at datetime  not null ,
	apdate_at datetime  not null 
);

CREATE TABLE IF NOT EXISTS `table_orcamento` (
	`id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
	`total` DOUBLE NOT NULL,
	`id_utilizadores` VARCHAR(255) NOT NULL,
	`enabled` BOOLEAN,
	`created_at` DATETIME,
	`uptated_at` DATETIME,
	PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `table_prestacao_servic` (
	`id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
	`disignacao` VARCHAR(100) NOT NULL,
	`subtotal` DOUBLE NOT NULL,
	`haras_estimadas` INTEGER NOT NULL,
	`id_prestador` VARCHAR(255) NOT NULL,
	`id_servico` INTEGER NOT NULL,
	`preco_hora` DOUBLE,
	`estado` ENUM('pendente', 'enprogresso', 'cancelamento', 'FINALIZADO') NOT NULL,
	`id_orcamento` INTEGER,
	`enabled` BOOLEAN NOT NULL,
	`created_at` DATETIME NOT NULL,
	`updated_at` DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS `table_proposta` (
	`id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
	`id_prestacao` INTEGER,
	`.preco_hora` DOUBLE,
	`hora_estimada` INTEGER,
	`estado` ENUM('PENDENTE', 'ACEITO', 'RECUSAR'),
	`enable` BOOLEAN,
	`create_at` DATETIME,
	`uptate_at` DATETIME,
	PRIMARY KEY(`id`)
);

ALTER TABLE table_proposta
ADD CONSTRAINT fk_prestacao_servico_proposta
FOREIGN KEY(id_prestacao)
 REFERENCES table_prestacao_servic(id);
 
ALTER TABLE table_prestacao_servic
ADD CONSTRAINT fk_pretacao_servico_propo
FOREIGN KEY(id_prestador)
 REFERENCES tbl_prestadores(id),
 
 ADD CONSTRAINT fk_pretacao_servico_proposta
 FOREIGN KEY (id_servico)
 REFERENCES table_servicos(id);
 



