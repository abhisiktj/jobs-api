require('dotenv').config;
const User=require('../models/user');
const StatusCodes=require('http-status-codes');
const BadRequestError=require('../error/badRequest');
const AuthenticationError=require('../error/authentication');

const register=async(req,res)=>{

    const user =await User.create({...req.body});

    const token=user.getJWT();
     res.status(StatusCodes.CREATED).json({name:user.name,token});

}

const login=async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        throw new BadRequestError('Please provide Email and Password');
    }
    const user=await User.findOne({email});
    //authentication or not
    if(!user){
        throw new AuthenticationError("Invalid Credentials");
    }

    const passEqual=await user.comparePassword(password);
    if(!passEqual){
        throw new AuthenticationError("Invalid Credentials");
    }
    const token=user.getJWT();
    const name=user.name;
    res.status(StatusCodes.OK).json({name,token});
}

module.exports={register,login};
