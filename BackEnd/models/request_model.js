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

//fetch all requester_details
exports.getData=(req,res,next)=>{
    try 
    {
        //select query
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


