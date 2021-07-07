/*************************request model**********************************************************/

const con=require('../config/database');
const moment = require('moment');


//store Data
exports.storeData=(req,res,next)=>{

    try
    {
       
        let {
            req_name,req_contact_no,aadhar_card_no,ration_card_no,card_type,dependent_no,children_no,occupation,religion,
            address,location,contact_person,cp_contact_no,ngo,jamat_name,delivered_date
        }=req.body;

        const created_date=moment(new Date()).format("YYYY-MM-DD");

    

        // insert query
        const sql=`INSERT INTO rkd_data (full_name,contact_no,aadhar_card_no,ration_card_no,APL_BPL,no_of_dependents, 
            no_of_children_below_15years_age,occupation,religion,address,area_location,contact_person,cp_phone,NGO, 
            mohalla_masjid_jamat,created_date,delivery_date) VALUES  ?`;

        //query values
        let values=[
            [req_name,req_contact_no.replace(/\s+/g, ''),aadhar_card_no,ration_card_no,card_type,dependent_no,
            children_no,occupation,religion,address,location,contact_person,
            cp_contact_no.replace(/\s+/g, ''),ngo,jamat_name,created_date,(delivered_date === "") ? null : moment(delivered_date).format("YYYY-MM-DD")]
        ];

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
        res.json({error:`got error in model[exports.storeData] : ${err}`});
    }
   
   
    
    

}

//fetch DISTINCT requester_details
exports.getDistinctData=(req,res,next)=>{
    try 
    {
        //select distinct query
        const sql=`SELECT DISTINCT occupation,address,mohalla_masjid_jamat,area_location,contact_person,NGO,religion FROM rkd_data`;

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
            req_name,req_contact_no,aadhar_card_no,ration_card_no,card_type,dependent_no,children_no,occupation,religion,
            address,location,contact_person,cp_contact_no,ngo,jamat_name,delivery_date,created_date,id,delivery_status
        }=req.body;

        const sql=`UPDATE rkd_data SET full_name=?,contact_no=?,aadhar_card_no=?,ration_card_no=?,APL_BPL=?,no_of_dependents=?,
            no_of_children_below_15years_age=?,occupation=?,religion=?,address=?,area_location=?,contact_person=?,cp_phone=?,
            NGO=?,mohalla_masjid_jamat=?,created_date=?,delivery_date=?,delivery_status=?
            WHERE id=?`;

        let values=[
            req_name,req_contact_no.replace(/\s+/g, ''),aadhar_card_no,ration_card_no,card_type,dependent_no,children_no,
            occupation,religion,address,location,contact_person,cp_contact_no.replace(/\s+/g, ''),ngo,jamat_name,moment(created_date).format("YYYY-MM-DD"),
            (delivery_date)? moment(delivery_date).format("YYYY-MM-DD"):null,delivery_status,id
        ];

         con.query(sql,values,(err)=>{
            if(err){
               throw err;
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


//update selected record
exports.update_selected_record =(req,res,next)=>{

    try
    {

        for (let index = 0;  index< req.body.length; index++) {

            const id = req.body[index].id;
          
            const query=`UPDATE rkd_data SET delivery_status='delivered' WHERE id='${id}'`;

            con.query(query,(err)=>{
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


    }
    catch(err)
    {
        res.json({error:`got error in model[exports.update_selected_record] : ${err}`});
    }
   
}