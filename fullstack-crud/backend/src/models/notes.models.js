const mongoose = require('mongoose');


const notesSchema =new mongoose.Schema({
       title:{type:String,required:true},
       notes:{type:String,required:true},
       category:{type:String,required:true},
       author:{type:String,required:true}
},{
    versionKey:false,
    timestamps:true
})

const Notes = mongoose.model('notes',notesSchema);

module.exports = Notes;