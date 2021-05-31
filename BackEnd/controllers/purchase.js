/********************************************* purchase controller *************************************************/
const {Router}=require('express');
const router=Router();
const purchase_model=require('../models/purchase_model')


//store data into database
router.post('/store_purchase_details',purchase_model.storeData,(req,res)=>{
    (res.locals.success) ? res.json({success:`your record saved successfully`}): res.json({error:`got error when stroing form_details : ${res.locals.error.sqlMessage}`});
})


//get all requester_details from database
router.get('/get_purchase_details',purchase_model.getData,(req,res)=>{
    (res.locals.result)? res.json({result:res.locals.result}) : res.json({error:`got error when fetching purchase_details : ${res.locals.error}`});
})



module.exports = router;

