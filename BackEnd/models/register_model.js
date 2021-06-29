/************************************************ register model **********************************************************/
const con=require('../config/database');
const btoa = require('btoa');
const moment = require('moment');

//store_data
exports.storeData = (req,res,next) =>{
    const {uname,contact,email_id}=req.body.register_details;
    const password=btoa(req.body.register_details.password);
    const created_date=moment(new Date()).format("YYYY-MM-DD h:mm:ss");

    //insert query
    const sql=`INSERT INTO user_register (full_name,contact_no,email_id,password,created_date) VALUES ?`;

    // query values
    let values=[
        [
            uname,contact,email_id,password,created_date
        ]
    ];

    con.query(sql,[values],(err)=>{
        if(err){
           res.locals.error=err;
           next();
        }
        else{
           res.locals.success=true;
           next();
        }
    })

}