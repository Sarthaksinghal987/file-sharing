require('dotenv').config();
//This line imports and configures the dotenv module, which is commonly used to load environment variables from a .env file into the process.env object. 
//This is helpful for keeping sensitive information, such as database connection strings, secure.

const jwt = require('jsonwebtoken');
//This imports the jsonwebtoken library, which is used for generating and verifying JSON Web Tokens.

const User = require('../models/user');
//This line imports the User model, suggesting that the application involves user data, likely stored in a database.

const auth = async(req,res,next) =>{
    //This defines an asynchronous middleware function named auth.
    //Middleware functions in Express have access to the request (req) and response (res) objects, as well as the next function to pass control to the next middleware in the stack.
    
    const token=req.cookies.jwt;
    //This extracts the JWT from the jwt cookie in the request.
    
    if(!token)
    {
        return res.redirect('/');
        //If there's no JWT present in the cookie, the user is redirected to the root path ('/').
        
    }
    try {
        const varifyUse=jwt.verify(token,process.env.MY_SECRET_KEY);
        //This block attempts to verify the JWT using jwt.verify.
        
        const user=await User.findOne({_id:varifyUser._id}); 
        // If successful, it proceeds to find the corresponding user in the database using the User model.
        
    } catch(err) {
        return res.status(401).send("Invalid Token");
        // If an error occurs during verification, a 401 status is returned with the message "Invalid Token."
        
    }
    return next();
    //If everything is successful (valid token, user found), the control is passed to the next middleware in the stack.
    
}
module.exports=auth;
//The middleware function is exported for use in other parts of the application.
