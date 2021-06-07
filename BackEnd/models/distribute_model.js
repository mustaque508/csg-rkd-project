/************************************************ Distribute model **********************************************************/

const con=require('../config/database');
const moment = require('moment');

//store distribution details
exports.storeData = (req,res,next) =>{

    try
    {
        const{area,qty,ngo,incharge,csg_volunteers,data_collected,contact_person,cp_contact_no,vehicle_used,jamat_name}=req.body.distribute_details;
        const distribution_date=moment(new Date()).format("YYYY-MM-DD h:mm:ss");
    
        //insert query

        const sql=`INSERT INTO distribution_details (distribution_date,area,qty,NGO,incharge,csg_volunteers,data_collected,
                    mohall_masjid_jamat,contact_person,cp_phone,vehicle_used)
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

//get all distribution details
exports.getData = (req,res,next) =>{

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