/************** request controller *******************/
const {Router}=require('express');
const router=Router();
const request_model=require('../models/request_model');
const validations=require('../validation');
const con=require('../config/database');



//input validations
const validation = (req,res,next)=>{

    //get all input value and perform validation
    const {req_name,card_no,card_type,occupation,address,location,jamat_name,contact_person,req_contact_no,dependent_no,children_no}=req.body.request_details;
    const {contact_error,cp_contact_error}=req.body;


    //initialize empty to errors object
    const errors={};

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
    errors.dependent_no_error=validations.require_validation(dependent_no);
    errors.children_no_error=validations.require_validation(children_no);

    if(validations.checkallvalidation(errors)){
        
        //check contact_number already exist
        const sql="SELECT * FROM rkd_data WHERE contact_no='"+req_contact_no.replace(/\s+/g, '')+"'";

        con.query(sql,(err,result)=>{
            if(err){
                res.json({error:`got error when checking requester_contact_number already Exist : ${error}`});
            }
            else
            {
               
                if(result.length === 0){
                   
                    //check aadhar_card no already exist
                    const sql="SELECT * FROM rkd_data WHERE aadhar_rationcard_no='"+card_no+"'";
                    con.query(sql,(err,result)=>{
                        if(err){
                            res.json({error:`got error when checking aadhar_rationcard_number already Exist : ${error}`});
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
    else
    {
        res.json({errors});
    }
}

//store data into database
router.post('/store_request_details',validation,request_model.storeData,(req,res)=>{
    (res.locals.success) ? res.json({success:`your record saved successfully we will contact you shortly`}): res.json({error:`got error when stroing form_details : ${res.locals.error.sqlMessage}`});
})

//get all requester_details from database
router.get('/get_request_details',request_model.getData,(req,res)=>{
        
     (res.locals.result)? res.json({result:res.locals.result}) : res.json({error:`got error when fetching requester_details : ${res.locals.error}`});
})
module.exports = router;