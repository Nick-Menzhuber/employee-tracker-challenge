//define module dependecies
require('dotenv').config();
require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log("Connected to the employees database")
);



const menu = [
    {
        type: 'list',
        name: 'selection',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Quit']
    }
]


//initializing inquirer
function init() {
    inquirer
        .prompt(menu)
        .then(function (data) {
            if (data.selection === 'Quit') {
                console.log(`User selected to ${data.selection}`);
                quit();
            } else if (data.selection === 'View All Departments') {
                console.log(`User selected to ${data.selection}`);
                viewAllDepts();
            } else if (data.selection === 'View All Roles') {
                console.log(`User selected to ${data.selection}`);
                viewAllRoles();
            } else if (data.selection === 'View All Employees') {
                console.log(`User selected to ${data.selection}`);
                viewAllEmployees();
            }
        })
        .catch(error => {
            console.log("Error:", error)
        })
}

function viewAllDepts() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        init();
    })
}

function viewAllRoles() {
    db.query('SELECT * FROM roles', function (err, results) {
        console.table(results);
        init();
    })
}

function viewAllEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        init();
    })
}

function quit() {
    process.exit();
}

//function to call inquirer
init();
