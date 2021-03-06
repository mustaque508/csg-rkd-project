/***************************project run from this file****************/
// require('./config/database');
const express = require('express');
const path = require('path');  
const app=express();
const PORT=process.env.PORT || 5000;
app.use(express.json());

// // required request[controller] to perform requestForm  operation
// app.use(require('./controllers/request'));

// // required request[controller] to perform purchase  operation
// app.use(require('./controllers/purchase'));

// // required request[controller] to perform distribute  operation
// app.use(require('./controllers/distribute'));

// // required request[controller] to perform registerForm  operation
// app.use(require('./controllers/register'));

// // required request[controller] to perform login  operation
// app.use(require('./controllers/login'));

// used for proxy url
app.use(express.static(path.join(__dirname,'..','frontEnd','build')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','frontEnd','build','index.html'))
});



// running node server 
app.listen(PORT,()=>{
    console.log(`successfully server running on ${PORT}`);
});
