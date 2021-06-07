/********************************************* register controller *************************************************/
const {Router}=require('express');
const router=Router();
const validations=require('../validation');
const register_model=require('../models/register_model');
const con=require('../config/database');


//validations
const validation = (req,res,next)=>{

    const{uname,contact,email_id,password,cpassword}=req.body.register_details;
    const {intlTelInput_error}=req.body;

    //initialize empty to errors object
    const errors={};

    errors.name_error=validations.validate_name(uname);
    errors.phone_error=intlTelInput_error;
    errors.email_error=validations.validate_email(email_id);
    errors.pass_error=validations.validate_password(password);
    errors.cpass_error=validations.validate_confirm_password(cpassword,password);

    if(validations.checkallvalidation(errors))
    {
         //check contact_number already exist 
         const sql="SELECT * FROM user_register WHERE contact_no='"+contact.replace(/\s+/g, '')+"'";
         
         con.query(sql,(err,result)=>{
            if(err){
                res.json({error:`got error when checking register contact number already Exist : ${error}`});
            }
            else
            {
                if(result.length === 0)
                {
                    // check email_id already exist
                    const sql="SELECT * FROM user_register WHERE email_id='"+email_id+"'";

                    con.query(sql,(err,result)=>{
                        if(err){
                            res.json({error:`got error when checking register email-id already Exist : ${error}`});
                        }
                        else
                        {
                            if(result.length === 0){
                                next();
                            }
                            else{
                                errors.email_error="Already Exist";
                                res.json({errors});
                            }
                        }
                    })

                }
                else
                {
                    errors.phone_error="Already Exist";
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

//get register_details
router.post('/store_register_details',validation,register_model.storeData,(req,res)=>{
    (res.locals.success) ? res.json({success:`your record saved successfully`}): res.json({error:`got error when stroing form_details : ${res.locals.error.sqlMessage}`});
})
module.exports = router;

