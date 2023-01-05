
const mongoose = require('mongoose');



//POST schema
//step 1 creating schema
const postSchema = new mongoose.Schema(
    {
    title:{type:String, required:true},   
    body:{type:String, required:true},
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user",
      required:true,
    },
    },
    {
    timestamps:true,
  }
  );
  const Post= mongoose.model('post',postSchema);


  module.exports={Post}