const express =require('express');
const connect = require('./config/db');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const jwt=require("jsonwebtoken")



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

app.get("/about",async(req, res) => {
    try{
          const user = await User.find({email,password})
          res.status(201).send({user:user})
    }catch(err){
       res.status(500).send({message:err.message});
    }
})
app.get("/data",async(req, res) => {
       var token=req.headers.Authorization
jwt.verify(token,"masai",(err,decoded)=>{
if(err){
res.send("Invalid Token")
console.log(err)
} else {
res.send("Data ....")
}
})

})

app.get("/contact",async(req, res) => {
   var token=req.headers.authorization
   jwt.verify(token,"batman",(err,decoded)=>{
   if(err){
   res.send("Invalid Token")
   console.log(err)
   } else {
   res.send("contact....")
   }
   })
   
})



mongoose.set("strictQuery",false)

app.listen(5000,async() => {
   await connect()
    console.log("listening on port 5000")
})