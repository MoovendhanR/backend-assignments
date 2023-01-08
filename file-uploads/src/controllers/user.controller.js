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

router.post('',uploads.single("profilePic"),async(req, res)=>{
    try{
     
        // console.log(req.body);
        // console.log(req.file)
         const user=await User.create({
            firstName: req.body.firstName,
            profilePic: req.file.path,
         });
        return res.status(200).send(user);

     }catch(error){
        res.status(500).send({error:error.message});
     }
})


router.post('/multiple',uploads.any("profilePic"),async(req, res)=>{
    try{
           const filePaths = req.files.map((file)=>{
            // console.log({file});
            return file.path;
           })
              console.log({filePaths})
         const user=await User.create({
            firstName:req.body.firstName,
            profilePic:filePaths,
         });
         res.status(200).send(user);

     }catch(error){
        res.status(500).send({error:error.message});
     }
})



module.exports=router;