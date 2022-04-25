const express = require('express');
const router = express.Router();
const User = require('../models/user');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// url/api/auth/register
router.post('/register', async (req, res)=>{
   const newUser = new User({
       username : req.body.username,
       email : req.body.email,
       password : CryptoJS.AES.encrypt(
       req.body.password, process.env.PASS_KEY
       )
   });
    try{
       const userTosave = await newUser.save();
        res.status(200).json(userTosave)
    }catch(error){
        res.status(500).json({message: error.message})
    }

});

router.post('/login', async (req, res)=>{

    try{
        const user = await User.findOne({
            username: req.body.username 
         });
         !user && res.status(401).json("Wrong user name ");
         const depassword = CryptoJS.AES.decrypt(
             user.password, process.env.PASS_KEY
         );
         const newpassword = depassword.toString(CryptoJS.enc.Utf8);
         const inputpassword = req.body.password;

         newpassword != inputpassword && res.status(401).json("Wrong password ");

         const accessToken = jwt.sign({
             id: user._id,
             isAdmin: user.isAdmin,
             username: user.username
            }, 
            process.env.JWT_KEY, 
            {expiresIn: "2d"}
            );
            const {password, ...others} = user._doc;

        res.status(200).json({...others, accessToken });
    }catch(error){
        res.status(500).json(error);
    }
});

module.exports = router