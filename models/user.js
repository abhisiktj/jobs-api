const  mongoose  = require("mongoose");
const bcrypt=require('bcryptjs');
require('dotenv').config();
const jwt=require('jsonwebtoken')
const userSchema=new mongoose.Schema({
   name:{
      type: String,
      required: [true, 'Please provide name'],
      minlength: 3,
   },
   email:{
      type: String,
      required: [true, 'Please provide email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: true,
   },
   password:{
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6

   }
})

userSchema.pre('save',async function(){
   //not using arrow as then this will not point to document

   const salt=await bcrypt.genSalt(10);
   this.password=await bcrypt.hash(this.password,salt);

})


userSchema.methods.getJWT=function(){
 const token=jwt.sign({userId:this._id,name:this.name},`secret`,
   {expiresIn:'30d'});
   return token;
}

userSchema.methods.comparePassword=async function(password){
   return await bcrypt.compare(password,this.password);
}
module.exports=mongoose.model('User',userSchema);