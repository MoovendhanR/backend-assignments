const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
// console.log(process.env.port)

const app = express();

const usersController=require('./Controllers/user.controllers.js');
const postController=require("./Controllers/post.controllers");
const commentController=require('./Controllers/comment.controllers')

const { connect } = require('./configs/db.js');


app.use(express.json())

app.use("/users",usersController);
app.use("/posts",postController);
app.use("/comments",commentController);








//Crud operations 
//get => getting data from the server
//post => adding data to the server
//put/patch => updating data from the server
//delete => deleting data from the server









mongoose.set('strictQuery', false);
app.listen(process.env.port,async()=>{
  try{
    await connect();
  }catch(err){
    console.log(err);
  }
  console.log(`listening on port ${process.env.port}`)
})