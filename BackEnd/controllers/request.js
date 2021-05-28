/************** request controller *******************/
const {Router}=require('express');
const router=Router();
const request_model=require('../models/request_model');


//store data into database
router.post('/storeData',request_model.storeData,(req,res)=>{
    (res.locals.success) ? res.json({success:`your record saved successfully we will contact you shortly`}): res.json({error:`got error when stroing form_details : ${res.locals.error.sqlMessage}`});
})
module.exports = router;