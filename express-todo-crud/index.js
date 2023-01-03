const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json())

const connect=()=>{
  return mongoose.connect(
    "mongodb+srv://dhaval:dhaval_123@cluster0.ljuvz.mongodb.net/web15-atlas?retryWrites=true&w=majority",
    {useNewUrlParser: true}
    );
}


//userSchema
//step 1 creating schema
const userSchema =new mongoose.Schema(
  {
  firstName: {type: String,required: true},
  lastName: {type: String,required: false},
  email: {type: String,required: true,unique: true},
  password: {type: String,required: true}

},
{
  timestamps:true,
}
);

//Step 2 : Create the model
const User= mongoose.model('user',userSchema);

//POST schema
//step 1 creating schema
const postSchema = new mongoose.Schema(
  {
  tite:{type:String, required:true},   
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
  timestamps:true,
}
);

//step 2: Creating the model
const Comment = mongoose.model('comment',commentSchema)


//Crud operations 
//get => getting data from the server
//post => adding data to the server
//put/patch => updating data from the server
//delete => deleting data from the server

//users CRUD
app.get('/users',async(req, res) => {
  try{
    const users = await User.find().lean().exec();
     res.status(200).send({users: users})
  }catch(err){
    return res
    .status(500)
    .send({message:"something went wrong"})

  }
})

app.post('/users',async(req, res) => {
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



mongoose.set('strictQuery', false);
app.listen(5000,async()=>{
  try{
    await connect();
  }catch(err){
    console.log(err);
  }
  console.log("listening on port 5000")
})