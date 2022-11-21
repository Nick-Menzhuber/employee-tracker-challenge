//dotenv setup
require('dotenv').config();

//sequelize setup
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
)

//define module dependecies
const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
