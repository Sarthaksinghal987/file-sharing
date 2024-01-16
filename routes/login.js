const router = require('express').Router();
const User=require('../models/user');

router.post('/',async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;
        const user=await User.findOne({email:email});
        if(user==null){
            return res.render('redirectToLogin');
        }
        if(user.validPassword(password)){
            const token=await user.generateAuthToken();
            res.cookie('jwt',token,{
                expires:new Date(Date.now()+1000*60*10),
                httpOnly:false// now user cannot edit the cookie manually means remove etc.
            });
            res.render('letsgets');
        }else{
            res.render('redirectToLogin');
        }
    }catch(error){
        res.status(400).send(error);
    }

})

module.exports=router;