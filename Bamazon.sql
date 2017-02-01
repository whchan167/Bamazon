CREATE DATABASE Bamazon_DB;

USE Bamazon_DB;

CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT NOT NULL
, product_name VARCHAR(100) NULL
, department_name VARCHAR(100) NULL
, price DECIMAL(10,4) NOT NULL default 0
, stock_quantity INTEGER(11) NOT NULL default 0
, product_sales INTEGER(11) NOT NULL default 0
, PRIMARY KEY (item_id)
);

SELECT * FROM products;

CREATE TABLE departments (
department_id INTEGER(11) AUTO_INCREMENT NOT NULL
, department_name VARCHAR(100) 
, over_head_costs DECIMAL(10,2) NOT NULL default 0
, total_sales INTEGER(11) NOT NULL default 0
, total_profit INTEGER(11) NOT NULL default 0
, PRIMARY KEY (department_id)
);

SELECT * FROM departments;