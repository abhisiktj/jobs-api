const CustomError=require("../error/customError");
const StatusCodes=require('http-status-codes');
const errorHandler=(error,req,res,next)=>{
    let customError={
        statusCode:error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message:error.message || "Internal Server Error"
    }
    if(error instanceof CustomError){
        res.status(error.status).json({msg:error.message})
    }
    else{
    if(error.name=="ValidationError"){
        customError.message=Object.values(error.errors)
        .map((item)=> item.message)
        .join(',');
        customError.statusCode=400;
    }
      if(error.code && error.code===11000){
        customError.message=`Duplicate value for ${Object.keys(error.keyValue)}`;
        customError.statusCode=StatusCodes.BAD_REQUEST;
      }
    if(error.name=='CastError'){
        customError.message=`No item found with id ${error.value}`;
        customError.statusCode=404;
    }
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
    res.status(customError.statusCode).json(customError.message);
    }
}

module.exports=errorHandler;