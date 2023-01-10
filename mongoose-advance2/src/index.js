const express =require('express');
const connect = require('./config/db');
const mongoose = require('mongoose');
const User = require('./models/user.model');


const app = express();

app.use(express.json())

app.get("/",async(req, res) => {
     try{
        const users = await User.find().lean().exec();
       res.status(200).send({users:users})
     }catch(err){
        res.status(500).send({message:err.message});
     }
})
app.post("/register",async(req, res) => {
    try{
           const user=await User.create(req.body);
           res.status(201).send(user)
    }catch(err){
       res.status(500).send({message:err.message});
    }
})
app.post("/login",async(req, res) => {
    const {email, password} = req.body
    try{
          const user = await User.find({email,password})
          if(user.length>0){
          res.status(201).send({user:user})
          }else{
             res.send("wrong credential")
          }
    }catch(err){
       res.status(500).send({message:err.message});
    }
})

app.get("/about",async(req, res) => {
    try{
          const user = await User.find({email,password})
          res.status(201).send({user:user})
    }catch(err){
       res.status(500).send({message:err.message});
    }
})
app.get("/data",async(req, res) => {
    const token=req.query.token;
    try{
          if(token === "abc123"){
                
          }
          res.status(201).send({user:user})
    }catch(err){
       res.status(500).send({message:err.message});
    }
})

app.get("/contact",async(req, res) => {
    try{
          const user = await User.find({email,password})
          res.status(201).send({user:user})
    }catch(err){
       res.status(500).send({message:err.message});
    }
})



mongoose.set("strictQuery",false)

app.listen(5000,async() => {
   await connect()
    console.log("listening on port 5000")
})