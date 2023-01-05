const mongoose = require('mongoose');



//COMMent schema
//Step 1: Create new schema
const commentSchema = new mongoose.Schema(
    {
      body: {type:String,required:true},
      postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:true
      },
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
      },
  },
  { 
    versionKey:false,
    timestamps:true,
  }
  );
  
  //step 2: Creating the model
  const Comment = mongoose.model('comment',commentSchema)
module.exports={Comment}  