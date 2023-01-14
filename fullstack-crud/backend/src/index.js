const express=require('express');
const mongoose  = require('mongoose');
const connect = require('./config/db');
const userController=require("./controllers/user.controller.js")

const app = express();

app.use(express.json());

app.use("/",userController)




mongoose.set("strictQuery",true);
app.listen(5000,async()=>{
    await connect();
    console.log('listening on port 5000')
})