const express=require('express');
const mongoose  = require('mongoose');
const connect = require('./config/db');
const userController=require("./controllers/user.controller.js")
const notesController = require("./controllers/note.controller.js");
const authenticate = require('./middlewares/authenticate.middleware.js');
const cors=require("cors");
const app = express();

app.use(cors({
    origin:"*"
}))

app.use(express.json());
app.get("/",(req,res) =>{
    res.send("Home Page");
})

app.use("/users",userController)
app.use(authenticate)
app.use("/notes",notesController)




mongoose.set("strictQuery",true);
app.listen(5000,async()=>{
    await connect();
    console.log('listening on port 5000')
})