CREATE DATABASE Bamazon_DB;

USE Bamazon_DB;

CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT NOT NULL
, product_name VARCHAR(100) NULL
, department_name VARCHAR(100) NULL
, price DECIMAL(10,4) NULL
, stock_quantity INTEGER(11) NULL
, product_sales INTEGER(11) NUll
, PRIMARY KEY (item_id)
);

SELECT * FROM products;

CREATE TABLE departments (
department_id INTEGER(11) AUTO_INCREMENT NOT NULL
, department_name VARCHAR(100) NULL
, over_head_costs DECIMAL(10,2) NULL
, total_sales INTEGER(11) NULL
, total_profit INTEGER(11)
, PRIMARY KEY (department_id)
);

SELECT * FROM departments;