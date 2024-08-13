const jwt = require('jsonwebtoken')
const  {UnauthenticatedError} = require('../errors')

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    // console.log(req.headers);
    console.log(authHeader);
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new  UnauthenticatedError('No Token Provided')
    }
    //401 authentication ERROR 
    const token = authHeader.split(' ')[1]

    console.log(token);
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = {id, username}
        next()
    }catch(error){
        throw new UnauthenticatedError('Not Authorized to access this route')
    }
}

module.exports = authenticationMiddleware;