//define module dependecies
//const cTable = require('console.table');
//const exp = require('constants');
//const inquirer = require('inquirer');
//const mysql = require('mysql2');
const sequelize = require('./config/connection');

//initialize app
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
