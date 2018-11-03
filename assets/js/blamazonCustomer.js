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
                item_id: element.ITEM_ID,
                name: element.PRODUCT_NAME,
                price: element.PRICE,
                stock: element.STOCK_QUANTITY,
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
        ])
    })
}