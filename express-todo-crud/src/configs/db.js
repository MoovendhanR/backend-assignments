const mongoose = require('mongoose');


const connect=()=>{
    return mongoose.connect(
      "mongodb+srv://dhaval:dhaval_123@cluster0.ljuvz.mongodb.net/web15-atlas?retryWrites=true&w=majority",
      // "mongodb://127.0.0.1:27017/masaidb",
      {useNewUrlParser: true}
      );

  }

  module.exports={connect}