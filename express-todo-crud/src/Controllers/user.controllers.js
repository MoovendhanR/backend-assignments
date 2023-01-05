 const express=require('express')
 const {User} = require('../Models/user.model')


 const app=express();


//users CRUD
app.get('/',async(req, res) => {
    try{
      const users = await User.find().lean().exec();
      res.status(200).send({users: users})
       // console.log(users.find({firstName:"nari"}))
    }catch(err){
      return res
      .status(500)
      .send({message:"something went wrong"})
  
    }
  })
  
  app.post('/',async(req, res) => {
    try{
       const user = await User.create(req.body)
       res.status(201).send({user: user})
       console.log("data added successfully")
  
    }catch(err){
      return res
      .status(500)
      .send({message:err.message})
  
    }
  })
  
  
  
  app.get('/:id',async(req, res) => {
    try{
      // console.log(req.params)
      const user = await User.findById(req.params.id).lean().exec();
      res.status(200).send( user)
       // console.log(users.find({firstName:"nari"}))
      }catch(err){
      return res
      .status(500)
      .send({message:err.message})
  
    }
  })
  
  
  
  app.patch('/:id',async(req, res) => {
    try{
     // console.log(req.params)
      const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
      //new:true instant update
      res.status(200).send( user)
       // console.log(users.find({firstName:"nari"}))
    }catch(err){
      return res
      .status(500)
      .send({message:err.message})
  
    }
  })
  
  
  app.delete('/:id',async(req, res) => {
    try{
      // console.log(req.params)
      const user = await User.findByIdAndDelete(req.params.id).lean().exec();
      res.status(200).send(user)
    }catch(err){
      return res
      .status(500)
      .send({message:err.message})
    }
  })
  
  
  module.exports=app;