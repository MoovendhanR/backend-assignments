const express=require("express");
const MongoClient = require('mongodb').MongoClient
var db

  const app=express()

  app.use(express.json())

   app.get("/",(req,res)=>{
    // const data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    // console.log(data.students)
    // res.send(data.teachers)
     res.sendFile(__dirname+"/index.html")
   })

   app.post('/quotes', (req, res) => { 
    db.collection('quotes').save(req.body, (err, result) => {    if (err) return console.log(err)}
    })




   MongoClient.connect('mongodb+srv://dhaval:dhaval_123@cluster0.ljuvz.mongodb.net/web15-atlas?retryWrites=true&w=majority', (err, database) => {  
    if (err){ return console.log(err) }
    db = database  
     app.listen(5000,()=>{
      console.log("listening on port 5000")
     })
   })

