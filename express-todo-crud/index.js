const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json())

const connect=()=>{
  return mongoose.connect(
    "mongodb+srv://dhaval:dhaval_123@cluster0.ljuvz.mongodb.net/web15-atlas?retryWrites=true&w=majority",
    // "mongodb://127.0.0.1:27017/masaidb",
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
     // console.log(users.find({firstName:"nari"}))
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



app.get('/users/:id',async(req, res) => {
  try{
    // console.log(req.params)
    const user = await User.findById(req.params.id).lean().exec();
    res.status(200).send( user)
     // console.log(users.find({firstName:"nari"}))
    }catch(err){
    return res
    .status(500)
    .send({message:err.message})

  }
})



app.patch('/users/:id',async(req, res) => {
  try{
   // console.log(req.params)
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
    //new:true instant update
    res.status(200).send( user)
     // console.log(users.find({firstName:"nari"}))
  }catch(err){
    return res
    .status(500)
    .send({message:err.message})

  }
})


app.delete('/users/:id',async(req, res) => {
  try{
    // console.log(req.params)
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();
    res.status(200).send(user)
  }catch(err){
    return res
    .status(500)
    .send({message:err.message})
  }
})





//POSTS crud
app.get('/posts',async(req, res) => {
  try{
    const posts = await Post.find()
    //.populate("userId")
    .populate({
      path:"userId",
      select:{firstName:1,_id:0,email:1}
    })
    .lean()
    .exec();
     res.status(200).send({posts: posts})
  }catch(err){
    return res
    .status(500)
    .send({message:"something went wrong"})

  }
});
app.post('/posts',async(req, res) => {
    try{
      const  post= await Post(req.body);
      res.status(201).send({post: post})

    }catch(err){
      res.status(500).send({message:err.message})
    }
})

app.get('/posts/:id',async(req, res) => {
  try{
   // console.log(req.params)
    const post = await Post.findById(req.params.id)
    .populate("userId")
    .lean()
    .exec();
    res.status(200).send(post)
     // console.log(users.find({firstName:"nari"}))
  }catch(err){
    return res
    .status(500)
    .send({message:err.message})

  }
})

app.patch("/posts/:id",async(req, res) => {
   try{
    const post = await Post.findByIdAndUpdate(req.params.id, req.body,{new:true}).lean().exec();
     res.status(200).send(post);
   }catch(err){
    return res
    .status(500)
    .res.send({message:err.message})
   }
})

app.delete("/posts/:id",async(req,res)=>{
    try{

     const post = await Post.findByIdAndDelete(req.params.id).lean().exec();
     res.status(200).send(post)

    }catch(err){
      res
      .status(500)
      .send({message:err.message});
    }
})

//getting all comments
app.get("/posts/:postId/comments",async(req, res)=>{
  try{

    const comments = await Comment.find({postId: req.params.postId})
    .populate({
      path:"postId",
      select:["title"],//nested populate
      populate:{path:"userId",select:["firstName"]}
    })
    .populate({
      path:"userId",
      select:{firstName:1,_id:0,email:1}
    })
    .lean().exec();
    res.status(200).send({comments:comments});

   }catch(err){
     res
     .status(500)
     .send({message:err.message});
   }
})

//COMMENTS crud
app.get("/comments",async(req, res)=>{
  try{
    const comments = await Comment.find()
    .populate({
      path:"postId",
      select:["title"],//nested populate
      populate:{path:"userId",select:["firstName"]}
    })
    .populate({
      path:"userId",
      select:{firstName:1,_id:1,email:1}
    })    .lean()
    .exec();
    res.status(200).send({comments: comments});


  }catch(err){
       res
       .status(500)
       .send({message:err.message});
  }
})
app.post("/comments",async(req, res)=>{
  try{
    const comment = await Comment.create(req.body);
    res.status(200).send({comment: comment});

  }catch(err){
       res
       .status(500)
       .send({message:err.message});
  }
})


app.get("/comments/:id",async(req, res)=>{
  try{
  const comment=await Comment.findById(req.params.id)
  .populate({
    path:"postId",
    select:["title"],//nested populate
    populate:{path:"userId",select:["firstName"]}
  })
  .populate({path:"userId",select:["firstName","email"]})
  .lean()
  .exec();
  res.status(200).send(comment);
  }catch(err){
    res.status(500).send({message:err.message});
  }
})



app.patch("/comments/:id",async(req, res)=>{
  try{
  const comment=await Comment.findByIdAndUpdate(req.params.id,req.body,{new:true})
  .populate({
    path:"postId",
    select:["title"],//nested populate
    populate:{path:"userId",select:["firstName"]}
  })
  .populate({
    path:"userId",
    select:{firstName:1,_id:0,email:1}
  })
  .lean().exec();
  res.status(200).send(comment);
  }catch(err){
    res.status(500).send({message:err.message});
  }
})

app.delete("/comments/:id",async(req, res)=>{
  try{
  const comment=await Comment.findByIdAndDelete(req.params.id)
  .populate({
    path:"postId",
    select:["title"],//nested populate
    populate:{path:"userId",select:["firstName"]}
  })
  .populate({
    path:"userId",
    select:{firstName:1,_id:0,email:1}
  })
  .lean()
  .exec();
  res.status(200).send(comment);
  }catch(err){
    res.status(500).send({message:err.message});
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