/************************************************ Distribute model **********************************************************/

const con=require('../config/database');
const moment = require('moment');

//store distribution details
exports.storeData = (req,res,next) =>{

    try
    {
        const{area,qty,ngo,incharge,csg_volunteers,data_collected,contact_person,cp_contact_no,vehicle_used,jamat_name}=req.body;
        const distribution_date=moment(new Date()).format("YYYY-MM-DD h:mm:ss");
    
        //insert query

        const sql=`INSERT INTO distribution_details (distribution_date,area,qty,NGO,incharge,csg_volunteers,data_collected,
                    mohalla_masjid_jamat,contact_person,cp_phone,vehicle_used)
                    VALUES ('${distribution_date}','${area}','${qty}','${ngo}','${incharge}','${csg_volunteers}','${data_collected}',
                    '${jamat_name}','${contact_person}','${cp_contact_no}','${vehicle_used}')`;

        con.query(sql,(err)=>{
            if(err){
                res.locals.error=err;
                next();
            }
            else
            {
                res.locals.success=true;
                next();
            }
        })
    }
    catch(err)
    {
        res.send({error:`got error in model[exports.storeData in distribute_model] : ${err}`});
    }

    
}

//get  distinct distribute details from database
exports.getDistinctData = (req,res,next) =>{

    try
    {
        //select query
        const sql="SELECT DISTINCT  area,NGO,incharge,csg_volunteers,mohalla_masjid_jamat,contact_person,vehicle_used FROM distribution_details";

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
        res.send({error:`got error in model[exports.getData in distribute_model] : ${err}`});
    }
    
   
}


//fetch all purchase Details
exports.getAllData = (req,res,next)=>{

    try 
    {
        //select query
        const sql=`SELECT * FROM distribution_details`;

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

//delete record
exports.delete_record =(req,res,next)=>{
    try
    {
        const {id}=req.body;
       
        const sql=`DELETE FROM distribution_details WHERE id='${id}'`;

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

//update record
exports.update_record=(req,res,next)=>{

    try
    {

        const{area,qty,ngo,incharge,csg_volunteers,data_collected,contact_person,cp_contact_no,vehicle_used,jamat_name,id}=req.body;

        sql=`UPDATE distribution_details SET area='${area}',qty='${qty}',NGO='${ngo}',incharge='${incharge}',
            csg_volunteers='${csg_volunteers}',data_collected='${data_collected}',vehicle_used='${vehicle_used}',
            mohalla_masjid_jamat='${jamat_name}',contact_person='${contact_person}', cp_phone='${cp_contact_no}'
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