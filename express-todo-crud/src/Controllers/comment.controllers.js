const express=require('express');
const {Comment} = require('../Models/comment.model.js');


const app = express();


//COMMENTS crud
app.get("/",async(req, res)=>{
    try{
      const comments = await Comment.find()
      .populate({
        path:"postId",
        select:["title"],//nested populate
        populate:{path:"userId",select:["firstName"]}
      })
      .populate({
        path:"userId",
        select:{firstName:1,_id:1,email:1}
      })    .lean()
      .exec();
      res.status(200).send({comments: comments});
  
  
    }catch(err){
         res
         .status(500)
         .send({message:err.message});
    }
  })
  app.post("/",async(req, res)=>{
    try{
      const comment = await Comment.create(req.body);
      res.status(200).send({comment: comment});
  
    }catch(err){
         res
         .status(500)
         .send({message:err.message});
    }
  })
  
  
  app.get("/:id",async(req, res)=>{
    try{
    const comment=await Comment.findById(req.params.id)
    .populate({
      path:"postId",
      select:["title"],//nested populate
      populate:{path:"userId",select:["firstName"]}
    })
    .populate({path:"userId",select:["firstName","email"]})
    .lean()
    .exec();
    res.status(200).send(comment);
    }catch(err){
      res.status(500).send({message:err.message});
    }
  })
  
  
  
  app.patch("/:id",async(req, res)=>{
    try{
    const comment=await Comment.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .populate({
      path:"postId",
      select:["title"],//nested populate
      populate:{path:"userId",select:["firstName"]}
    })
    .populate({
      path:"userId",
      select:{firstName:1,_id:0,email:1}
    })
    .lean().exec();
    res.status(200).send(comment);
    }catch(err){
      res.status(500).send({message:err.message});
    }
  })
  
  app.delete("/:id",async(req, res)=>{
    try{
    const comment=await Comment.findByIdAndDelete(req.params.id)
    .populate({
      path:"postId",
      select:["title"],//nested populate
      populate:{path:"userId",select:["firstName"]}
    })
    .populate({
      path:"userId",
      select:{firstName:1,_id:0,email:1}
    })
    .lean()
    .exec();
    res.status(200).send(comment);
    }catch(err){
      res.status(500).send({message:err.message});
    }
  })
  
module.exports=app;  