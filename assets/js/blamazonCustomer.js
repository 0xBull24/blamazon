// Required packages
const inquirer = require('inquirer');
const mysql = require('mysql');

// Connection details
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB || 'blamazon',
});

// Connect to the DB
connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected to database successfully on thread #${connection.threadId}`);
    getAllItems();
});


function getAllItems() {
    connection.query('Select ITEM_ID, PRODUCT_NAME, PRICE, STOCK_QUANTITY from products', (err, res) => {
        if (err) throw err;
        const items = []
        res.forEach(element => {
            let item = {
                name: element.PRODUCT_NAME,
                value: element,
            }
            items.push(item);
        });

        inquirer.prompt([
            // Select the ID
            {
                type: 'list',
                message: 'Which item would you like to purchase?',
                name: 'itemChoice',
                choices: items
            }
        ]).then(item => {
            orderItem(item);
        })
    })
}

// Order Item
function orderItem(item) {
    inquirer.prompt([
        // Ask about quantity and validate it is a number > 0
        {
            type: 'input',
            message: 'How many would you like to buy?',
            name: 'itemQuantity',
            validate: (input) => {
                return (!isNaN(parseFloat(input)) && input > 0)
            }
        }
    ]).then(quantity => {
        if (quantity.itemQuantity <= item.itemChoice.STOCK_QUANTITY) {
            let newStock = item.itemChoice.STOCK_QUANTITY - quantity.itemQuantity
            updateQuantity('products', item.itemChoice.PRODUCT_NAME, newStock)
        } else if (item.itemChoice.STOCK_QUANTITY === 0) {
            console.log(`\nSorry we have dont have any more ${item.itemChoice.PRODUCT_NAME}`)
            getAllItems();
        } else {
            console.log(`\nSorry we only have ${item.itemChoice.STOCK_QUANTITY} available`)
            orderItem(item);
        }
    })
}

// Update a given item's quantity
function updateQuantity(table, item, quantity) {
    connection.query(`UPDATE ${table} SET STOCK_QUANTITY = ${quantity} WHERE PRODUCT_NAME = \'${item}\'`, (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} row(s) was affected`);
    })
}