const mongoose = require('mongoose');


const notesSchema =new mongoose.Schema({
       title:{type:String,required:true},
       notes:{type:String,required:true},
       category:{type:String,required:true},
       userID:{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"user",
        type:String,
        required:true
    }
},{
    versionKey:false,
    timestamps:true
})

const Notes = mongoose.model('note',notesSchema);

module.exports = Notes;