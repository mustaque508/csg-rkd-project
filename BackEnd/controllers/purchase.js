/********************************************* purchase controller *************************************************/
const {Router}=require('express');
const router=Router();
const purchase_model=require('../models/purchase_model');
const validation =require('../validation');


//input validations
const validations = (req,res,next) =>{

    //get data from URL request
    const {supplier,qty,rate,delivered_by,recieved_by,loaded_by,unloaded_by,vehicle_used}=req.body;


    //initialize empty to errors object
    const errors={};

    // apply validation
    errors.supplier_error=validation.validate_name(supplier);
    errors.qty_error=validation.require_validation(qty);
    errors.rate_error=validation.require_validation(rate);
    errors.delivered_by_error=validation.validate_name(delivered_by);
    errors.recieved_by_error=validation.validate_name(recieved_by);
    errors.loaded_by_error=validation.validate_name(loaded_by);
    errors.unloaded_by_error=validation.validate_name(unloaded_by);
    errors.vehicle_used_error=validation.validate_name(vehicle_used);

    (validation.checkallvalidation(errors)) ? next():res.json({errors});
   
}
//store data into database
router.post('/store_purchase_details',validations,purchase_model.storeData,(req,res)=>{
 
    (res.locals.success) ? res.json({success:`your record saved successfully`}): res.json({error:`got error when stroing form_details : ${res.locals.error.sqlMessage}`});
})


//get all requester_details from database
router.get('/get_purchase_details',purchase_model.getData,(req,res)=>{
    (res.locals.result)? res.json({result:res.locals.result}) : res.json({error:`got error when fetching purchase_details : ${res.locals.error}`});
})



module.exports = router;

