
const User=require('../models/user');
const jwt=require('jsonwebtoken');
const AuthenticationError=require('../error/authentication');

const auth = async (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new AuthenticationError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1]
    try {
      const payload = jwt.verify(token,"secret")
      // attach the user to the job routes
      req.user = { userId: payload.userId, name: payload.name }
      next()
    } catch (error) {
        console.log(error);
        throw new AuthenticationError('Authentication invalid')
    }
  }
  
  module.exports = auth





