const express=require("express");
const fs=require("fs");

  const app=express()

  app.use(express.json())

   app.get("/",(req,res)=>{
    const data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    console.log(data.students)
    res.send(data.students)
   })

   app.post("/",(req,res)=>{
    console.log(req.body)
       res.send("data has been updated!")
   })




   app.listen(5000,()=>{
    console.log("listening on port 5000")
   })