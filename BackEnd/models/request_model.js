/*************************request model**********************************************************/

const con=require('../config/database');
const moment = require('moment');


//store Data
exports.storeData=(req,res,next)=>{

    try
    {
        const{req_name,req_contact_no,card_no,card_type,dependent_no,children_no,occupation,address,location,jamat_name,
        contact_person,cp_contact_no}=req.body.request_details;
        const created_date=moment(new Date()).format("YYYY-MM-DD h:mm:ss");

        //insert query
        const sql=`INSERT INTO rkd_data (full_name,contact_no,aadhar_rationcard_no,APL_BPL,no_of_dependents,occupation,
                   no_of_children_below_15years_age,address,area_location,mohalla_masjid_jamat,contact_person,cp_phone,created_date)
                   VALUES ('${req_name}','${req_contact_no}','${card_no}','${card_type}','${dependent_no}','${occupation}',
                   '${children_no}','${address}','${location}','${jamat_name}','${contact_person}','${cp_contact_no}',
                   '${created_date}')`;
      
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
        res.json({error:`got error in model[exports.storeData] : ${err}`});
    }
   
   
    
    

}

//fetch DISTINCT requester_details
exports.getDistinctData=(req,res,next)=>{
    try 
    {
        //select distinct query
        const sql=`SELECT DISTINCT occupation,address,mohalla_masjid_jamat,area_location,contact_person FROM rkd_data`;

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

//fetch all request Details
exports.getAllData = (req,res,next)=>{

    try 
    {
        //select query
        const sql=`SELECT * FROM rkd_data`;

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
        res.json({error:`got error in model[exports.getAllData] : ${err}`});
    }

}


//delete requester_details
exports.delete_record =(req,res,next)=>{
    try
    {
        const {id}=req.body;
       
        const sql=`DELETE FROM rkd_data WHERE id='${id}'`;

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

//update requester_details
exports.update_record=(req,res,next)=>{

    try
    {

        const {
            id,req_name,req_contact_no,card_no,card_type,dependent_no,children_no,occupation,address,location,jamat_name,
            contact_person,cp_contact_no,
        }=req.body.request_details;

        sql=`UPDATE rkd_data SET full_name='${req_name}',contact_no='${req_contact_no}',aadhar_rationcard_no='${card_no}',
            APL_BPL='${card_type}',no_of_dependents='${dependent_no}',occupation='${occupation}',no_of_children_below_15years_age='${children_no}',
            address='${address}',area_location='${location}',mohalla_masjid_jamat='${jamat_name}',
            contact_person='${contact_person}', cp_phone='${cp_contact_no}'
            WHERE id='${id}'`;

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
        res.json({error:`got error in model[exports.update_record] : ${err}`});
    }

}