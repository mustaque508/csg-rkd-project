/************************************ login controller *****************************************/
const {Router}=require('express');
const router=Router();
const Validations=require('../validation');
const con=require('../config/database');
const btoa = require('btoa');
const login_model=require('../models/login_model');


//cookie expiry for 1 day
const REMEMBERME_COOKIE_EXPIRY=new Date(Date.now()+86400000);


//set cookie
const setCookie = (req,res,next) =>{
 
  //get data
  const {remember_me,email_id,password}=req.body;
  

  if(remember_me)
  {
      //set cookie
      res.cookie('email_cookie',btoa(email_id),{expires:REMEMBERME_COOKIE_EXPIRY});
      res.cookie('password_cookie',btoa(password),{expires:REMEMBERME_COOKIE_EXPIRY});
      res.cookie('rememberme_cookie',remember_me,{expires:REMEMBERME_COOKIE_EXPIRY});
      next();
  }
  else
  {
      //delete cookie
      res.clearCookie('email_cookie');
      res.clearCookie('password_cookie');
      res.clearCookie('rememberme_cookie');
      next();
  }
 
}


//validation
const validation = (req,res,next) =>{
   
     //get data
     const {email_id,password}=req.body;

     const errors={};

     errors.email_error=Validations.validate_email(email_id);
     errors.pass_error=Validations.validate_password(password);

     if(Validations.checkallvalidation(errors))
     {

         const sql=`SELECT * FROM user_register WHERE email_id='${email_id}'`;

         con.query(sql,(err,result)=>{
           if(err){
             res.json({error:`got error when getting user registeration details : ${err}`}); 
           }
           else{
              
              //check email_id is registered
              if(result.length === 0){
                  errors.email_error="Email-id is not registered";
                  res.json({errors});
              }
              else
              {
                  result.map((data,index)=>{

                    //check password is correct or not
                    if(btoa(password) === data.password)
                    {
                            //check user isAuthorized
                            if(data.isAuthorized === 1)
                            {
                                next();
                            }
                            else{
                              
                              errors.email_error="unauthorized email-id";
                              res.json({errors});
                            }
                    }
                    else{
                      errors.pass_error="Invalid password";
                      res.json({errors});
                    }
                   
                  })
              }
           }
         })


     }
     else
     {
         res.json({errors});
     }
}

//login
router.post('/login',validation,setCookie,login_model.getData,(req,res)=>{
  (res.locals.result) ? res.json({result:res.locals.result}) : res.json({error:`got error when fetching user_name : ${res.locals.error}`});
})

//fetch role_details based on role_id
router.post('/get_role_detials',login_model.getRoleDetails,(req,res)=>{
  (res.locals.result) ? res.json({result:res.locals.result}) : res.json({error:`got error when fetching role_details : ${res.locals.error}`});
})


module.exports = router;