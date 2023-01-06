const mongoose=require('mongoose');


const heroSchema=new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:false},
    age:{type:Number, required:true},
    power:{type:String, required:true},
    isMarried:{type:Boolean, required:true}, 
},
{
    versionKey:false,
    timestamps:true,
}
)

const Hero=mongoose.model("hero",heroSchema)

module.exports=Hero;