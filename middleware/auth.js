require('dotenv').config();
//This line imports and configures the dotenv module, which is commonly used to load environment variables from a .env file into the process.env object. 
//This is helpful for keeping sensitive information, such as database connection strings, secure.

const jwt = require('jsonwebtoken');
//This imports the jsonwebtoken library, which is used for generating and verifying JSON Web Tokens.

const User = require('../models/user');
//This line imports the User model, suggesting that the application involves user data, likely stored in a database.

const auth = async(req,res,next) =>{
    const token=req.cookies.jwt;
    if(!token)
    {
        return res.redirect('/');
    }
    try {
        const varifyUse=jwt.verify(token,process.env.MY_SECRET_KEY);
        const user=await User.findOne({_id:varifyUser._id}); 
    } catch(err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}
module.exports=auth;
//The middleware function is exported for use in other parts of the application.
