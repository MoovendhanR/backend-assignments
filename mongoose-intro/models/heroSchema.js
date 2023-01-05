
const mongoose=require('mongoose');


const connect=async()=>{
    try{
       const connection =await mongoose.connect("mongodb://127.0.0.1:27017/herosdb",{usenewUrlParser:true});
            console.log("connected to the database")
            // await Studentmodel.insertMany([{name:"moovi",age:24,city:"blore",isMarried:false},{name:"nari",age:29,city:"chennai",isMarried:true}])
            // connection.disconnect();
            // console.log("disconnected")  
            // const student= new Studentmodel({
            //     name:"arvi",
            //     age:64,
            //     city:"blore",
            //     isMarried:false
            // });  
            // await student.save();

            // const students = await Studentmodel.find({ city:"chennai"})
         //   console.log(students);
    }catch(e){
        console.log("cannot connect")
        console.log(e.message)
    }
}


const HeroSchema = mongoose.Schema({
    name:String,
    age:Number,
    legal:Boolean,
    city:String,
    power:Number,
    language:String,
    //name:{type:String,required:true},
    // city:{type:String,required:true},
    // power:{type:String,required:true},
    // language:{type:String,required:true},
    // isMarried:{type:Boolean,required:true},
})


const Hero = mongoose.model('hero',HeroSchema)


module.exports={connect,Hero}