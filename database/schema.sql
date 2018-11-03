DROP DATABASE IF EXISTS blamazon;
CREATE DATABASE blamazon;

USE blamazon;

CREATE TABLE PRODUCTS (
    ITEM_ID INT NOT NULL AUTO_INCREMENT,
    PRODUCT_NAME VARCHAR(50) NOT NULL,
    DEPT_NAME VARCHAR(30) NOT NULL,
    PRICE DECIMAL(5,2) NULL,
    STOCK_QUANTITY INT(3) NULL,
    PRIMARY KEY (ITEM_ID)
);

-- Insert rows into table 'PRODUCTS'
INSERT INTO PRODUCTS
( -- columns to insert data into
 PRODUCT_NAME, DEPT_NAME, PRICE, STOCK_QUANTITY
)
VALUES
( 
 'Rubbber bands', 'Home Goods', .99, 100
),
( 
 '50 inch TV', 'Electronics', 700.0, 25
),
( 
 'Wireless Charger', 'Electronics', 10.99, 25
),
( 
 'Lion beanie babie', 'Toys', 14.99, 35
),
( 
 'iPhoneX case', 'Electronics', 10.99, 20
),
( 
 'Pax 3', 'Electronics', 205.00, 10
),
( 
 '4pc Couch', 'Home Goods', 899.99, 5
),
( 
 'Area Rug 10x12', 'Home Goods', 399.99, 7
),
( 
 'Beyblade', 'Toys', 12.99, 35
),
( 
 'Tamogotchi', 'Toys', 10.99, 50
)