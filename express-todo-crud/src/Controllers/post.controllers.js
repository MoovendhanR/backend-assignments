const express=require('express');
const { Comment } = require('../Models/comment.model.js');
const {Post} = require('../Models/post.model.js')

const app = express();


//POSTS crud
app.get('/',async(req, res) => {
    try{
      const posts = await Post.find()
      //.populate("userId")
      .populate({
        path:"userId",
        select:{firstName:1,_id:0,email:1}
      })
      .lean()
      .exec();
       res.status(200).send({posts: posts})
    }catch(err){
      return res
      .status(500)
      .send({message:"something went wrong"})
  
    }
  });
  app.post('/',async(req, res) => {
      try{
        const  post= await Post(req.body);
        res.status(201).send({post: post})
  
      }catch(err){
        res.status(500).send({message:err.message})
      }
  })
  
  app.get('/:id',async(req, res) => {
    try{
     // console.log(req.params)
      const post = await Post.findById(req.params.id)
      .populate("userId")
      .lean()
      .exec();
      res.status(200).send(post)
       // console.log(users.find({firstName:"nari"}))
    }catch(err){
      return res
      .status(500)
      .send({message:err.message})
  
    }
  })
  
  app.patch("/:id",async(req, res) => {
     try{
      const post = await Post.findByIdAndUpdate(req.params.id, req.body,{new:true}).lean().exec();
       res.status(200).send(post);
     }catch(err){
      return res
      .status(500)
      .res.send({message:err.message})
     }
  })
  
  app.delete("/:id",async(req,res)=>{
      try{
  
       const post = await Post.findByIdAndDelete(req.params.id).lean().exec();
       res.status(200).send(post)
  
      }catch(err){
        res
        .status(500)
        .send({message:err.message});
      }
  })
  
  //getting all comments
  app.get("/:postId/comments",async(req, res)=>{
    try{
  
      const comments = await Comment.find({postId: req.params.postId})
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
      res.status(200).send({comments:comments});
  
     }catch(err){
       res
       .status(500)
       .send({message:err.message});
     }
  })
  

  module.exports=app