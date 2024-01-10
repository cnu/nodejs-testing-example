CREATE TABLE `products`
(
  `id`            INT(11) NOT NULL auto_increment ,
  `sku`           VARCHAR(255) NOT NULL ,
  `name`          VARCHAR(255) NOT NULL ,
  `in_stock`      BOOLEAN NOT NULL ,
  `created_at`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at`    DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,

  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_sku_uniq` (`sku`(255))
)
engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;

INSERT INTO products(sku, name, in_stock)
VALUES
('sku-1','Product 1',1),
('sku-2','Product 2',0),
('sku-3','Product 3',0),
('sku-4','Product 4',1),
('sku-5','Product 5',0),
('sku-6','Product 6',1),
('sku-7','Product 7',0),
('sku-8','Product 8',1),
('sku-9','Product 9',1),
('sku-10','Product 10',1),
('sku-11','Product 11',0),
('sku-12','Product 12',1),
('sku-13','Product 13',0),
('sku-14','Product 14',1),
('sku-15','Product 15',1),
('sku-16','Product 16',1);