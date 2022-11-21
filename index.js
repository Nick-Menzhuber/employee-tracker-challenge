//define module dependecies
require('dotenv').config();
const cTable = require('console.table');;
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
        message: 'Welcome to Employee Tracker! Where would you like to start?',
        choices: ['View All Departments', 'View All Roles', 'View All', 'Quit']
    }
]


//initializing inquirer
function init() {
    inquirer
    .prompt(menu)
    .then(function (data) {
        if (data.selection === 'Quit')
        console.log(`User selected to ${data.selection}`);
        quit();
    })
    .catch(error => {
        console.log("Error:", error)
      })    
}

function quit() {
    process.exit();
}

//function to call inquirer
init();
