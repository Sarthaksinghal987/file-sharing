require('dotenv').config();
//Imports and configures the dotenv module to load environment variables from a .env file. 
//This is commonly used for storing sensitive information, like secret keys.

const mongoose = require('mongoose');
//Imports the Mongoose library, a MongoDB ODM for Node.js.

const Schema = mongoose.Schema;
//Creates a reference to the Schema constructor from Mongoose.

const bcrypt=require('bcrypt');
//Imports the bcrypt library, which is used for hashing passwords.

const jwt=require('jsonwebtoken');
//Imports the jsonwebtoken library, which is used for generating and verifying JSON Web Tokens.

const userSchema = new Schema({     
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });
//Defines the schema for the "User" model. 

//generating token

userSchema.methods.generateAuthToken = async function(){
    try{
        const token=jwt.sign({_id:this._id},process.env.MY_SECRET_KEY)
        return token;
    }catch(error){
        res.send("Error in generating token");
    }
}
//Defines a method generateAuthToken on the user schema. 
//This method generates a JWT token using the user's _id and a secret key stored in the environment variables.

// generating bcrypt password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
//Defines a method generateHash for generating a bcrypt hash of a given password.
  
  // checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
//Defines a method validPassword for checking if a given password is valid by comparing it with the stored hashed password.

module.exports = mongoose.model('User', userSchema);
//Exports the Mongoose model for the "User" schema. 
//The model is named "User" and will be used to interact with the "users" collection in the connected MongoDB database.
