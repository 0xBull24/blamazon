const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'blamazon',
});

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
        console.log(items);

        inquirer.prompt([
            // Select the ID
            {
                type: 'list',
                message: 'Which item would you like to purchase?',
                name: 'itemChoice',
                choices: items
            }
        ]).then(item => {
            inquirer.prompt([
                // Ask about quantity and validate it is a number
                {
                    type: 'input',
                    message: 'How many would you like to buy?',
                    name: 'itemQuantity',
                    validate: (input) => {
                        return (!isNaN(parseFloat(input)) && input > 0)
                    }
                }
            ]).then(quantity => {
                console.log(item.itemChoice.PRODUCT_NAME);
                if (quantity.itemQuantity <= item.itemChoice.STOCK_QUANTITY) {
                    let newStock = item.itemChoice.STOCK_QUANTITY - quantity.itemQuantity
                    updateQuantity('products', item.itemChoice.PRODUCT_NAME, newStock)
                } else {
                    console.log(`Sorry we only have ${item.itemChoice.STOCK_QUANTITY} available`)
                }
            })
        })
    })
}

// Update a given item's quantity
function updateQuantity(table, item, quantity) {
    var query = connection.query(`UPDATE ${table} SET STOCK_QUANTITY = ${quantity} WHERE PRODUCT_NAME = \'${item}\'`, (err, res) => {
        if (err) throw err;
        console.log(query);
        console.log(res);
        console.log(res.affectedRows);
    })
}