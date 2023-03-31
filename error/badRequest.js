const CustomError=require('./customError');
const StatusCodes=require('http-status-codes');
class BadRequestError extends CustomError{
   constructor(message){
    this.status=StatusCodes.BAD_REQUEST;
    super(message);
   }

}
module.exports=BadRequestError