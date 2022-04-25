const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/getUsers', async (req, res)=>{
    try{
        const user = await User.find();
        // user.password = "";
        res.status(200).json(user)

    }catch(error){
        res.status(500).json({message: error.message})
    }

});


module.exports = router