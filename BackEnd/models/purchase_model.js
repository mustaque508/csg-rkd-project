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
                    unloaded_by,vehicle_used) VALUES ?`;
      
            
        //query values
        var values=[
            [
                purchase_date,supplier,qty,rate,delivered_by,recieved_by,loaded_by,unloaded_by,vehicle_used
            ]
        ]

        con.query(sql,[values],(err)=>{
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

//get  distinct purchase_details from database
exports.getDistinctData=(req,res,next)=>{
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



//fetch all purchase Details
exports.getAllData = (req,res,next)=>{

    try 
    {
        //select query
        const sql=`SELECT * FROM purchase_details`;

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

//update record
exports.update_record = (req,res,next)=>{
    
    try
    {
        const{delivered_by,loaded_by,qty,rate,recieved_by,supplier,unloaded_by,vehicle_used,id}=req.body;

        const sql=`UPDATE purchase_details SET delivered_by=?,loaded_by=?, qty=?,rate=?,
        recieved_by=?,supplier=?,unloaded_by=?,vehicle_used=? WHERE id=?`;

        // query values
        let values=[
            delivered_by,loaded_by,qty,rate,recieved_by,supplier,unloaded_by,vehicle_used,id
        ];

        con.query(sql,values,(err)=>{
            if(err){
                res.locals.error=err;
                next();
            }else{
                res.locals.success=true;
                next();
            }         
        })

    }
    catch(err){
        res.json({error:`got error in model[exports.update_record] : ${err}`});
    }
}


//delete record
exports.delete_record=(req,res,next)=>{
    try
    {
        const {id}=req.body;
       
        const sql=`DELETE FROM purchase_details WHERE id='${id}'`;

        con.query(sql,(err,result)=>{
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
        res.json({error:`got error in model[exports.delete_record] : ${err}`});
    }
}