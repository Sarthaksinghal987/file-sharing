require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const Schema = mongoose.Schema;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userSchema = new Schema({     
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

//generating token

userSchema.methods.generateAuthToken = async function(){
    try{
        const token=jwt.sign({_id:this._id},process.env.MY_SECRET_KEY)
        return token;
    }catch(error){
        res.send("Error in generating token");
    }
}

// generating bcrypt password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
  
  // checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);