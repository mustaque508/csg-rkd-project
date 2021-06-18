/************************************************ login model **********************************************************/

const con=require('../config/database');

//get data based on email_id
exports.getData = (req,res,next)=>{
    try
    {

        const {email_id}=req.body;

        const sql=`SELECT * FROM user_register WHERE email_id='${email_id}'`;

        con.query(sql,(err,result)=>{
            if(err){
                res.locals.error=err;
                next();
            }
            else{
            result.map((data)=>{
                res.locals.result=data;
                next();
            })
            
            }
        })
    }
    catch(err)
    {
        res.send({error:`got error in model[exports.getData in login model] : ${err}`});
    }
}

//get data based on role_id from role_details
exports.getRoleDetails = (req,res,next)=>{
    try
    {
        const {role_id}=req.body;
        
        const sql=`SELECT *FROM role_details WHERE role_id=${role_id}`;

        con.query(sql,(err,result)=>{
            if(err){
                res.locals.error=err;
                next();
            }
            else{
                res.locals.result=result;
                next();
            }
        })
    }
    catch(err)
    {
        res.send({error:`got error in model[exports.getRoleDetails in login model] : ${err}`});
    }
    

}