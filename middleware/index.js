const express = require('express');

const app = express();


app.use(logger)

app.get('/users', (req, res) => {
    console.log("users page")
    return res.send("users page")
})

app.use(logger1)

function logger1(req, res ,next) {
    console.log("before route handler logger 1")
    next()
    console.log("after route handler  logger 1")
}

app.get('/students', (req, res) => {
    console.log("students page")
    return res.send("students page")

})
app.get("/admin", (req, res) => {
    console.log("admins page")
    return res.send("admins page")

})

app.get("/products",loggedIn("seller"), (req, res ) => {
    return res.send("Yes you can get the products")

})



function loggedIn(role) {

 return function loggers(req, res ,next) {
    if(role === "seller"){
        return next();
    }

    return res.send("not allowed")
}
}



function logger(req, res ,next) {

    //  if(req.path === "/users"){
    //     req.role="user";
    //  }else if(req.path === "/admin"){
    //     req.role="admin";
    //  }else{
    //     req.role="somebody"
    //  }
    console.log("before route handler logger")
    next()
    console.log("after route handler logger")
}


app.listen(5000,()=>{
    console.log("listening on port 5000")
})