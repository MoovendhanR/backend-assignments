const express=require('express');
const mongoose=require('mongoose');
const connect = require('./config/db.js');
require('dotenv').config()


const herosController=require('./controllers/hero.controller.js')
const app = express();
app.use(express.json());

app.use("/heros",herosController);

mongoose.set("strictQuery",false)
app.listen(process.env.port,async()=>{
    try{
    connect()
      console.log(`server running on port ${process.env.port}`)
    }catch(e){
        console.log(e)
    }
})