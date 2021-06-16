/************************************ Distribute controller *****************************************/
const {Router}=require('express');
const router=Router();
const validations=require('../validation');
const distribute_model=require('../models/distribute_model');

//validate input data
const validation = (req,res,next) =>{
   
    //get input data
    const {area,qty,ngo,incharge,csg_volunteers,data_collected,contact_person,vehicle_used,jamat_name}=req.body.distribute_details;
    const {cp_contact_error}=req.body;

    //initialize empty to errors object
    const errors={};

    // validations
    errors.area_error=validations.require_validation(area);
    errors.qty_error=validations.require_validation(qty);
    errors.ngo_error=validations.validate_name(ngo);
    errors.incharge_error=validations.validate_name(incharge);
    errors.csg_volunteers_error=validations.validate_name(csg_volunteers);
    errors.data_collected_error=validations.require_validation(data_collected);
    errors.contact_person_error=validations.validate_name(contact_person);
    errors.cp_contact_error=cp_contact_error;
    errors.vehicle_used_error=validations.validate_name(vehicle_used);
    errors.jamat_name_error=validations.validate_name(jamat_name);

    if(validations.checkallvalidation(errors))
    {
        next();
    }
    else
    {
        res.json({errors});
    }
}

//storeData
router.post('/store_distribute_details',validation,distribute_model.storeData,(req,res)=>{
    (res.locals.success) ? res.json({success:`your record saved successfully`}): res.json({error:`got error when stroing form_details : ${res.locals.error.sqlMessage}`});
})

//get distinct distribute details from database
router.get('/get_distinct_distribute_details',distribute_model.getDistinctData,(req,res)=>{
    (res.locals.result)? res.json({result:res.locals.result}) : res.json({error:`got error when fetching requester_details : ${res.locals.error}`});
})


//get all distribute details from database
router.get('/get_all_distribute_details',distribute_model.getAllData,(req,res)=>{
        
    (res.locals.result)? res.json({result:res.locals.result}) : res.json({error:`got error when fetching requester_details : ${res.locals.error}`});
})


module.exports = router;