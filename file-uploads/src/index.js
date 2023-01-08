const connect = require('./config/db.js');
const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config()
const app = express();
const userController = require('./controllers/user.controller.js')

app.use("users",userController);

const PORT = process.env.port;
mongoose.set("strictQuery",false)
app.listen(PORT,async()=>{
    try{
       await connect();
       console.log("listen on port " + PORT);
    }catch(err){
        console.error(err.message);
    }
})