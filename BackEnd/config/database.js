/***************************database connection*********************/
const mysql = require('mysql');

const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Mustaqmj@1',
    database:'csg_rkd_db'

});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected successfully");
});

module.exports=con;