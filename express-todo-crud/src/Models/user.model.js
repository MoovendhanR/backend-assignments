const mongoose=require('mongoose');
//userSchema
//step 1 creating schema
const userSchema =new mongoose.Schema(
    {
    firstName: {type: String,required: true},
    lastName: {type: String,required: false},
    email: {type: String,required: true,unique: true},
    password: {type: String,required: true}
  
  },
  {
    timestamps:true,
  }
  );
  
  //Step 2 : Create the model
  const User= mongoose.model('user',userSchema);

  module.exports={User}