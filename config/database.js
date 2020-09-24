// CREATE TABLE users(id INT PRIMARY KEY AUTO_INCREMEMT, email STRING, password STRING, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
const mysql = require("mysql");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

let connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD
});
connection.connect((error)=>{
    if(error) return console.log("database connection failed");
    return console.log("database connection successful");
});

module.exports = connection;
