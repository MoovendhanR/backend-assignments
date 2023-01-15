const express =require('express');
const mongoose = require('mongoose');
const jwt=require("jsonwebtoken");
const User = require('../models/user.model');



const router = express.Router();


router.get("/users",async(req, res) => {
     try{
        const users = await User.find().lean().exec();
       res.status(200).send({users:users})
     }catch(err){
        res.status(500).send({message:err.message});
     }
})
router.post("/register",async(req, res) => {
    try{
           const user=await User.create(req.body);
           res.status(201).send(user)
    }catch(err){
       res.status(500).send({message:err.message});
    }
})
router.post("/login",async(req, res) => {
    const {email, password} = req.body
    try{
          const user = await User.find({email,password});
          const token = jwt.sign({ course: 'backend' }, 'masai');//payload ,secret key
          if(user.length>0){
          res.status(201).send({"mes":"login successfull","token":token});
          }else{
             res.send("wrong credential")
          }
    }catch(err){
       res.status(500).send({message:err.message});
    }
})

router.get("/about",async(req, res) => {
    try{
          const user = await User.find({email,password})
          res.status(201).send({user:user})
    }catch(err){
       res.status(500).send({message:err.message});
    }
})
router.get("/data",async(req, res) => {
var token=req.headers.authorization
jwt.verify(token,"masai",(err,decoded)=>{
if(err){
res.send("Invalid Token")
console.log(err)
} else {
res.send("Data ....")
}
})

})

router.get("/contact",async(req, res) => {
    var token=req.headers.authorization
    jwt.verify(token,"masai",(err,decoded)=>{
   if(err){
   res.send("Invalid Token")
   console.log(err)
   } else {
   res.send("contact....")
   }
   })
   
})


module.exports=router;