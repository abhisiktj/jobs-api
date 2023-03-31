const mongoose = require('mongoose');

const jobsSchema=new mongoose.Schema({
    company:{
        type:String,
        required:[true,'Please provide company name'],
        maxlength:50
    },
    position:{
        type:String,
        required:[true,'Please provide position name'],
        maxlength:40
    },
    status:{
        type:String,
        enum:['interview','declined','pending'],
        default:'pending'
    },
    createdBy:{
     type:mongoose.Types.ObjectId,
     ref:'user',
     required:[true,'please provide user']
    }


},{timestamps:true});
module.exports=mongoose.model('Job',jobsSchema);