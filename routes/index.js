const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send('hello world from index.js');
});

router.get("/info",(req,res)=>{
    res.send("message from info.js");
})

module.exports=router;