
const mongoose=require('mongoose');




// const HeroSchema = mongoose.Schema({
//     name:String,
//     age:Number,
//     legal:Boolean,
//     city:String,
//     power:Number,
//     language:String,
//     //name:{type:String,required:true},
//     // city:{type:String,required:true},
//     // power:{type:String,required:true},
//     // language:{type:String,required:true},
//     // isMarried:{type:Boolean,required:true},
// })


// const Hero = mongoose.model('hero',HeroSchema)


const userSchema=new mongoose.Schema({
    name:String,
    age:Number,
    legal:Boolean,
    city:String,
    language:String
    })
    //model
    const Hero=mongoose.model("user",userSchema)
    module.exports={
Hero    }


// module.exports={connect,Hero}