const mongoose= require('mongoose');

// lastName:{type:String,required:false},
// email:{type:String,required:true,unique:true},
// password:{type:String,required:true},
// age:{type:Number,required:true},

const userSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    profilePic:[{type:String,required:false}],
},{
    versionKey:false,
    timestamps:true
})

const User = mongoose.model('user',userSchema);

module.exports=User;