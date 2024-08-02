//Check username, password in post(login) request
// if exists create a new JWT- JSON web token 
// send back to front end 

//set up authentication so that only the request with JWT can access the dashboard 
const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors/bad-request')

const login = async (req, res) => {
    const {username, password} = req.body;
    //1-mongoose validations- id
    //2-validation in front of request, joy package- DO LATER  
    //3-check for values 
    //JWT-Header/Payload(information you read)/Signature is secure and digitally signed , HTTP is stateless- forgets 
    
    if(!username || !password){
        throw new BadRequestError('Please provide email and passwork')
    }
    //only demo, would have a DB do this 
    const id = new Date().getDate()

    //PAYLOAD- this is the payload, keep it small 
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'
    })

    console.log(username, password);
    res.status(200).json({msg:'user created', token})
}

const dashboard = async (req, res) =>{
    console.log(req.user);
    const luckyNumber = Math.floor(Math.random()*100);
    res.status(200).json({
        msg:`Hello, ${req.user.username}`, 
        secret: `Here is your authorized lucky number ${luckyNumber}`,
    })

}

module.exports = {
    dashboard, login, 
}