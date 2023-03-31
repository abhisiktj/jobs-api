
const mongoose=require('mongoose');

mongoose.set('strictQuery',true);
const uri=process.env.MONGO_URI;
const connectDB=(uri)=>{
    return mongoose.connect(uri);
}
module.exports=connectDB;