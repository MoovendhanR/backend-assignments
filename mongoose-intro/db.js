const express=require('express');
const mongoose=require("mongoose")
const{Hero} = require('./models/heroSchema.js')
const {connect} = require('./connect')

const app = express();





//student 
const studentSchema =new mongoose.Schema(
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


const Student=mongoose.model('student',studentSchema)
   



//CRUD
app.get("/students",async(req,res) => {
    try{
    const students=await Student.find().lean().exec();
    res.status(200).send({
        students:students
    })
}catch(err){
    res.status(500).send({message:err.message});
}
})

app.post("/students",async(req,res) => {
    try{
    const student=await Student.create(req.body);
    res.status(201).send(student)
    console.log("data added successfully")

}catch(err){
    res.status(500).send({message:err.message});
}
})


app.patch("/students/:id",async(req,res) => {
    try{
    const student=await Student.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(201).send(student)
    console.log("data update successfully")

}catch(err){
    res.status(500).send({message:err.message});
}
})

app.delete("/students/:id",async(req,res) => {
    try{
    const student=await Student.findByIdAndDelete(req.params.id);
    res.status(201).send(student)
    console.log("data deleted successfully")

}catch(err){
    res.status(500).send({message:err.message});
}
})


//heros crud
app.get("/heros",async(req,res) => {
    try{
    const heros=await Hero.find();
    res.status(200).send(heros)
   

}catch(err){
    res.status(500).send({message:err.message});
}
})


app.post("/heros",async(req,res) => {
    try{
        const hero = await Hero.create(req.body)
        res.status(201).send({hero:hero})
        console.log("data added successfully")
    // const data=req.body;
    // const hero = Hero(data);
    // await hero.save();
    // res.status(200).send(hero);

}catch(err){
    res.status(500).send({message:err.message});
}
})



mongoose.set("strictQuery",false)
app.listen(3000,()=>{
    connect;
    console.log("listening on 3000 port")
})
