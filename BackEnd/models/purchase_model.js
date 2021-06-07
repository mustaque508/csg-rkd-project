/************************************************ purchase model **********************************************************/

const con=require('../config/database');
const moment = require('moment')

//store purchase_details in database
exports.storeData = (req,res,next)=>{

    try
    {
        const{supplier,qty,rate,delivered_by,recieved_by,loaded_by,unloaded_by,vehicle_used}=req.body;
        const purchase_date=moment(new Date()).format("YYYY-MM-DD h:mm:ss");

        //insert query
        const sql =`INSERT INTO purchase_details (purchase_date,supplier,qty,rate,delivered_by,recieved_by,loaded_by,
                    unloaded_by,vehicle_used) VALUES ('${purchase_date}','${supplier}','${qty}','${rate}','${delivered_by}',
                    '${recieved_by}','${loaded_by}','${unloaded_by}','${vehicle_used}')`;
      

        con.query(sql,(err)=>{
            if(err){
                res.locals.error=err;
                next();
            }else{
                res.locals.success=true;
                next();
            } 
           
            
        })
    }
    catch(err)
    {
        res.send({error:`got error in model[exports.storeData in purchase_model] : ${err}`});
    }
   
   

}

//get purchase_details from database
exports.getData=(req,res,next)=>{
    try 
    {
        //select query
        const sql=`SELECT DISTINCT supplier,qty,rate,delivered_by,recieved_by,loaded_by,unloaded_by,vehicle_used
                    FROM purchase_details`;

        con.query(sql,(err,result)=>{
            if(err){
                res.locals.error=err;
                next();
            }else{
                res.locals.result=result;
                next();
            } 
           
            
        })

    }
    catch(err)
    {
        res.json({error:`got error in model[exports.getData] : ${err}`});
    }
}