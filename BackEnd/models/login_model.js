/************************************************ login model **********************************************************/

const con=require('../config/database');

//get data based on email_id
exports.getData = (req,res,next)=>{

    const {email_id}=req.body;

    const sql=`SELECT * FROM user_register WHERE email_id='${email_id}'`;

    con.query(sql,(err,result)=>{
        if(err){
            res.locals.error=err;
            next();
        }
        else{
           result.map((data)=>{
               res.locals.full_name=data.full_name;
               next();
           })
           
        }
    })
}