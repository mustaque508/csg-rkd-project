/***************************database connection*********************/
const mysql = require('mysql');
require('dotenv').config();

const con=mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database

});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected successfully");
});

module.exports=con;