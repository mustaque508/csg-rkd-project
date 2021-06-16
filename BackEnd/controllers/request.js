/************** request controller *******************/
const {Router}=require('express');
const router=Router();
const request_model=require('../models/request_model');
const validations=require('../validation');
const con=require('../config/database');



//input validations
const validation = (req,res,next)=>
{

    
      
    //initialize empty to errors object
    const errors={};



      //get all input value and perform validation
        const {req_name,card_no,card_type,occupation,address,location,jamat_name,contact_person,dependent_no,
        children_no,contact_error,cp_contact_error}=req.body.request_details;
      

        // validations
        errors.req_name_error=validations.validate_name(req_name);
        errors.req_contact_no_error=contact_error;
        errors.card_no_error=validations.validate_aadhar_card_number(card_no);
        errors.req_card_type_error=validations.require_validation(card_type);
        errors.occupation_error=validations.require_validation(occupation);
        errors.address_error=validations.require_validation(address);
        errors.location_error=validations.require_validation(location);
        errors.jamat_name_error=validations.validate_name(jamat_name);
        errors.contact_person_error=validations.validate_name(contact_person);
        errors.cp_contact_error=cp_contact_error;
        errors.dependent_no_error=validations.require_validation(dependent_no.toString());
        errors.children_no_error=validations.require_validation(children_no.toString());

   
    
   if(validations.checkallvalidation(errors))
   {

        let  sql="";

        const {id,req_contact_no,card_no,type}=req.body.request_details;

        if(type === "update")
        {
            //select id based on contact_no
            sql=`SELECT contact_no,aadhar_rationcard_no FROM rkd_data WHERE id='${id}'`;

            con.query(sql,(err,result)=>{

                if(err)
                {   
                    res.json({error:`got error when checking requester_contact_number: ${err}`});
                }
                else
                {
                    // check input[contact_no] and db[contact_no ] is same
                    if(result[0].contact_no === req_contact_no)
                    {
                        
                       
                        // check input[aadhar_rationcard_no] and db[aadhar_rationcard_no] is same
                        if(result[0].aadhar_rationcard_no === card_no)
                        {
                           next();
                        }
                        else
                        {
                            //check aadhar_rationcard_no already exist
                            sql=`SELECT *FROM rkd_data WHERE aadhar_rationcard_no='${card_no}'`;

                            con.query(sql,(err,result)=>{
                                if(err){
                                    res.json({error:`got error when checking aadhar_rationcard_number already Exist : ${err}`});
                                }
                                else{
                                    if(result.length === 0){
                                        next();                                       
                                    }
                                    else{
                                        errors.card_no_error="Already Exist";
                                        res.json({errors});
                                    }
                                }

                            })
                        }
                    }
                    else
                    {
                        //check contact_number already exist
                        sql=`SELECT * FROM rkd_data WHERE contact_no='${req_contact_no}'`;

                        con.query(sql,(err,result)=>{
                            if(err){
                                res.json({error:`got error when checking requester_contact_number already exist: ${err}`});
                            }
                            else {
                                if(result.length === 0){
                                   next();
                                }
                                else{
                                    errors.req_contact_no_error="Already Exist";
                                    res.json({errors});
                                }
                            }
                        })
                    }
                } 
            })
        }

        if(type === "insert")
        {
            //check contact_number already exist
            sql="SELECT * FROM rkd_data WHERE contact_no='"+req_contact_no.replace(/\s+/g, '')+"'";

            con.query(sql,(err,result)=>{
                if(err){
                    res.json({error:`got error when checking requester_contact_number already Exist : ${err}`});
                }
                else
                {
                   
                    if(result.length === 0){
                       
                        //check aadhar_card no already exist
                        const sql="SELECT * FROM rkd_data WHERE aadhar_rationcard_no='"+card_no+"'";
                        con.query(sql,(err,result)=>{
                            if(err){
                                res.json({error:`got error when checking aadhar_rationcard_number already Exist : ${err}`});
                            }
                            else
                            {
                                if(result.length ===0){
                                   next();
                                }
                                else{
                                    errors.card_no_error="Already Exist";
                                    res.json({errors});
                                }
                            }
                        })
                        
                    }else{
                        errors.req_contact_no_error="Already Exist";
                        res.json({errors});
                    }
                }
            })
        }
   }
   else
   {
        res.json({errors});
   }
  
}

//store data into database
router.post('/store_request_details',validation,request_model.storeData,(req,res)=>{
    (res.locals.success) ? res.json({success:`your record saved successfully we will contact you shortly`}): res.json({error:`got error when stroing form_details : ${res.locals.error.sqlMessage}`});
})

//get distinct requester_details from database
router.get('/get_distinct_request_details',request_model.getDistinctData,(req,res)=>{
        
     (res.locals.result)? res.json({result:res.locals.result}) : res.json({error:`got error when fetching requester_details : ${res.locals.error}`});
})

//get all requester_details from database
router.get('/get_all_request_details',request_model.getAllData,(req,res)=>{
        
    (res.locals.result)? res.json({result:res.locals.result}) : res.json({error:`got error when fetching requester_details : ${res.locals.error}`});
})


//delete requester_details based on aadhar/ration card no
router.post('/delete_requester_details',request_model.delete_record,(req,res)=>{
    (res.locals.success) ? res.json({success:res.locals.success}): res.json({error:`got error when deleting requester_details : ${res.locals.error.sqlMessage}`});
})


//update requester_details based on aadhar/ration card no
router.post('/update_requester_details',validation,request_model.update_record,(req,res)=>{
    (res.locals.success) ? res.json({success:res.locals.success}): res.json({error:`got error when updating requester_details : ${res.locals.error.sqlMessage}`});
})

module.exports = router;