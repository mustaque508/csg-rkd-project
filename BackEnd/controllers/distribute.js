/************************************ Distribute controller *****************************************/
const {Router}=require('express');
const router=Router();
const validations=require('../validation');


//validate input data
const validation = (req,res,next) =>{
   
    //get input data
    const {area,qty,ngo,incharge,csg_volnteers,data_collected,contact_person,vehicle_used}=req.body.distribute_details;
    const {cp_contact_error}=req.body;

    //initialize empty to errors object
    const errors={};

    // validations
    errors.area_error=validations.require_validation(area);
    errors.qty_error=validations.require_validation(qty);
    errors.ngo_error=validations.validate_name(ngo);
    errors.incharge_error=validations.validate_name(incharge);
    errors.csg_volnteers_error=validations.validate_name(csg_volnteers);
    errors.data_collected_error=validations.require_validation(data_collected);
    errors.contact_person_error=validations.validate_name(contact_person);
    errors.cp_contact_error=cp_contact_error;
    errors.vehicle_used_error=validations.validate_name(vehicle_used);

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
router.post('/store_distribute_details',validation,(req,res)=>{
   console.log("testing");
})

module.exports = router;