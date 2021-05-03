drop table if exists sub_categories;
drop table if exists categories;
drop table if exists items;

create table categories(
	id SERIAL primary key,
	name VARCHAR(50) not null unique,
	description text default ''
);

create table products(
	id SERIAL primary key,
	name VARCHAR(50) not null unique,
	image_url VARCHAR(150) not null,
	description text,
	price NUMERIC(5, 2),
	localization VARCHAR(50),
	is_published BOOLEAN default false,
	is_selled BOOLEAN default false
);

create table sub_categories (
  parent_category_id int references categories(id) ON UPDATE CASCADE ON DELETE CASCADE,
  child_category_id int references categories(id) ON UPDATE CASCADE ON DELETE CASCADE,
  constraint sub_category_pkey PRIMARY KEY (parent_category_id, child_category_id)
);

create table category_products (
  product_id int references products(id) ON UPDATE CASCADE ON DELETE CASCADE,
  category_id int references category(id) ON UPDATE CASCADE ON DELETE CASCADE,
  constraint category_product_pkey PRIMARY KEY (product_id, category_id)
);

INSERT INTO categories(name) VALUES ('Promociones');
  INSERT INTO categories(name) VALUES ('Ultimas ofertas');
INSERT INTO categories(name) VALUES ('Novedades');
  INSERT INTO categories(name) VALUES ('Esta semana');
INSERT INTO categories(name) VALUES ('Temporadas', );
  INSERT INTO categories(name) VALUES ('Primavera');
  INSERT INTO categories(name) VALUES ('Verano');
  INSERT INTO categories(name) VALUES ('Otoño', );
  INSERT INTO categories(name) VALUES ('Invierno');
INSERT INTO categories(name) VALUES ('Mochilas');
  INSERT INTO categories(name) VALUES ('Susuchon o Woot');
  INSERT INTO categories(name) VALUES ('Susu');
  INSERT INTO categories(name) VALUES ('Kapatera');
  INSERT INTO categories(name) VALUES ('Susuainiakajatu');
  INSERT INTO categories(name) VALUES ('Bolsos Maikisia');
  INSERT INTO categories(name) VALUES ('Piula o Kattowi');
  INSERT INTO categories(name) VALUES ('Susu Uttiakajamatu');
  INSERT INTO categories(name) VALUES ('Pequeños');
  INSERT INTO categories(name) VALUES ('Medianos');
  INSERT INTO categories(name) VALUES ('Grandes');
INSERT INTO categories(name) VALUES ('Vestidos');
  INSERT INTO categories(name) VALUES ('Mantas Wayuu');
INSERT INTO categories(name) VALUES ('Zapatos');
  INSERT INTO categories(name) VALUES ('Sandalias');
INSERT INTO categories(name) VALUES ('Hamacas');
INSERT INTO categories(name) VALUES ('Accesorios');
  INSERT INTO categories(name) VALUES ('Collares Wayuu');
INSERT INTO categories(name) VALUES ('Tejidas');
INSERT INTO categories(name) VALUES ('Paquete aprendizaje');

INSERT INTO sub_categories(parent_category_id, child_category_id) VALUES (1, 2);
INSERT INTO sub_categories(parent_category_id, child_category_id) VALUES (3, 4);
INSERT INTO sub_categories(parent_category_id, child_category_id) VALUES (5, 6);
INSERT INTO sub_categories(parent_category_id, child_category_id) VALUES (5, 7);
INSERT INTO sub_categories(parent_category_id, child_category_id) VALUES (5, 8);
INSERT INTO sub_categories(parent_category_id, child_category_id) VALUES (5, 9);
INSERT INTO sub_categories(parent_category_id, child_category_id) VALUES (10, 11);
INSERT INTO sub_categories(parent_category_id, child_category_id) VALUES (10, 12);
INSERT INTO sub_categories(parent_category_id, child_category_id) VALUES (10, 13);
INSERT INTO sub_categories(parent_category_id, child_category_id) VALUES (10, 14);
INSERT INTO sub_categories(parent_category_id, child_category_id) VALUES (10, 15);
INSERT INTO sub_categories(parent_category_id, child_category_id) VALUES (10, 16);
INSERT INTO sub_categories(parent_category_id, child_category_id) VALUES (10, 17);
INSERT INTO sub_categories(parent_category_id, child_category_id) VALUES (10, 18);
INSERT INTO sub_categories(parent_category_id, child_category_id) VALUES (10, 19);
INSERT INTO sub_categories(parent_category_id, child_category_id) VALUES (10, 20);
INSERT INTO sub_categories(parent_category_id, child_category_id) VALUES (21, 22);
INSERT INTO sub_categories(parent_category_id, child_category_id) VALUES (23, 24);
INSERT INTO sub_categories(parent_category_id, child_category_id) VALUES (30, 26);


INSERT INTO products(
  name, 
  image_url, 
  description, 
  price, 
  localization) 
VALUES (
  'Orgullosol', 
  'https://static.smallable.com/1221447-thickbox/sac-medium.jpg',
  'Es la descripción de la mochila.',
  56.45,
  'Riohacha'
);

INSERT INTO products(
  name, 
  image_url, 
  description, 
  price, 
  localization) 
VALUES (
  'HolaChic', 
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJN_2p0enpNI04yZHvtdtSjiI4U3BMMXSlcA1_L48S6rDT4yxwZkwHXtl4SYE&usqp=CAc',
  'Es la descripción de la mochila.',
  70.45,
  'Riohacha'
);

INSERT INTO category_products (product_id, category_id) VALUES (1, 5);
INSERT INTO category_products (product_id, category_id) VALUES (2, 5);
INSERT INTO category_products (product_id, category_id) VALUES (1, 1);
INSERT INTO category_products (product_id, category_id) VALUES (2, 2);

