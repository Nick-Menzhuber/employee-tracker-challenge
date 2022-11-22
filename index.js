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
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Quit']
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
            } else if (data.selection === 'Add a Department') {
                addDept();
            } else if (data.selection === 'Add a Role') {
                addRole();
            } else if (data.selection === 'Add an Employee') {
                addEmployee();
            }
        })
        .catch(error => {
            console.log("Error:", error)
        })
}

function viewAllDepts() {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) console.log(err);
        console.table(results);
        init();
    })
}

function viewAllRoles() {
    db.query('SELECT r.id, r.title, d.dept, r.salary FROM roles r JOIN department d ON r.department_id = d.id', function (err, results) {
        if (err) console.log(err);
        console.table(results);
        init();
    })
}

function viewAllEmployees() {
    db.query('SELECT e.id, e.first_name, e.last_name, r.title, d.dept, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager_name FROM employee e JOIN roles r ON r.id = e.role_id JOIN department d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id', function (err, results) {
        if (err) console.log(err);
        console.table(results);
        init();
    })
}

const addDept = () => {
    return inquirer
        .prompt([{
            type: 'input',
            name: 'new_dept',
            message: 'Please enter the name of the new department:'
        }
        ])
        .then(data => {
            let query = `INSERT INTO department (dept) VALUES ('${data.new_dept}')`;
            db.query(query, function (err, results) {
                if (err) console.log(err);
                console.log(`Okay, ${data.new_dept} has been added`);
                init();
            })
        }
        )
}

const addRole = () => {
    return inquirer
        .prompt([{
            type: 'input',
            name: 'new_role',
            message: 'Please enter the name of the new role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter the salary for the new role:'
        },
        {
            type: 'input',
            name: 'dept_id',
            message: 'Please enter the department ID for the new role:'
        }
        ])
        .then(data => {
            let query = `INSERT INTO roles (title, salary, department_id) VALUES ('${data.new_role}', '${data.salary}', '${data.dept_id}')`;
            db.query(query, function (err, results) {
                if (err) console.log(err);
                console.log(`Okay, ${data.new_role} has been added`);
                init();
            })
        }
        )
}

const addEmployee = () => {
    return inquirer
        .prompt([{
            type: 'input',
            name: 'first',
            message: 'Please enter the new employee\s first name:'
        },
        {
            type: 'input',
            name: 'last',
            message: 'Please enter the new employee\s last name:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Please enter the role ID for the new employee:'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Please enter the manager ID for the new employee'
        }
        ])
        .then(data => {
            let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${data.first}', '${data.last}', '${data.role_id}', '${data.manager_id}')`;
            db.query(query, function (err, results) {
                if (err) console.log(err);
                console.log(`Okay, ${data.first} has been added`);
                init();
            })
        }
        )
}

function quit() {
    process.exit();
}

//function to call inquirer
init();
