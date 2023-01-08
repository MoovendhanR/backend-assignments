const express = require('express');
const uploads = require('../middleware/uploads');
const User = require('../models/user.model');

const router=express.Router();

router.get('/',async(req, res)=>{
    try{
         const users=await User.find().lean().exec();
         res.status(200).send({users:users});

     }catch(error){
        res.status(500).send({error:error.message});
     }
})

router.post('/',uploads,async(req, res)=>{
    try{
        //  const user=await User.create(req.body);
         res.status(200).send("users");

     }catch(error){
        res.status(500).send({error:error.message});
     }
})



module.exports=router;