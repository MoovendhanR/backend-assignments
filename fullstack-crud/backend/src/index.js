const express=require('express');
const mongoose  = require('mongoose');
const connect = require('./config/db');
const userController=require("./controllers/user.controller.js")
const notesController = require("./controllers/note.controller.js");
const authenticate = require('./middlewares/authenticate.middleware.js');

const app = express();

app.use(express.json());

app.use("/users",userController)
app.use(authenticate)
app.use("/notes",notesController)




mongoose.set("strictQuery",true);
app.listen(5000,async()=>{
    await connect();
    console.log('listening on port 5000')
})