const router = require('express').Router();
const User=require('../models/user');

router.post('/',async(req,res)=>{
    try{
        const username=req.body.username;
        const email=req.body.email;
        const password=req.body.password;
        const user=await User.findOne({email:email});
        if(!user){
            let user=new User({
                username:username,
                email:email,
                password:password
            })
            user.password=user.generateHash(user.password);
            const token=await user.generateAuthToken();

            // it is used to set cookie name to value;
            res.cookie('jwt',token,{
                expires:new Date(Date.now()+1000*60*10),
                httpOnly:false// now user cannot edit the cookie manually means remove etc.
            });

            const registered=await user.save();
            return res.render('redirectToSuccess');
        }else{
            return res.render('redirect');
        }
    }catch(error){
        return res.status(400).send(error);
    }

})

module.exports=router;