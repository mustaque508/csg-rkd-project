
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
    // var sql = "INSERT INTO user_details (user_name, password) VALUES ('mustaque jamakhandi', 'Mustaqmj@1')";
    // con.query(sql, function (err, result) {
    //   if (err) throw err;
    //   console.log("1 record inserted");
    // });
  });

