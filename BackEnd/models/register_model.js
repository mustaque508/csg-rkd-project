/************************************************ register model **********************************************************/
const con=require('../config/database');
const btoa = require('btoa');

//store_data
exports.storeData = (req,res,next) =>{
    const {uname,contact,email_id}=req.body.register_details;
    const password=btoa(req.body.register_details.password)

    //insert query
    const sql=`INSERT INTO user_register (full_name,contact_no,email_id,password) VALUES ('${uname}','${contact}','${email_id}','${password}')`;

    con.query(sql,(err)=>{
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