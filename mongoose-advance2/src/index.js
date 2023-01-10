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
    try{
          const user = await User.find({email,password})
    }catch(err){
       res.status(500).send({message:err.message});
    }
})

mongoose.set("strictQuery",false)
app.listen(5000,async() => {
   await connect()
    console.log("listening on port 5000")
})