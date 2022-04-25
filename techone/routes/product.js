const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { verifyisAdmin, verifyToken, verifyUser } = require("./authmiddleware");

// url/api/product/newproduct
router.post('/newproduct', async (req, res)=>{
    const data = new Product({
        productname: req.body.productname,
        price: req.body.price,
        Description: req.body.Description,
    });
    try{
        const dataTosave = await data.save();
        res.status(200).json(dataTosave)
    }catch(error){
        res.status(400).json({message: error.message})
    }
    
});

// url/api/getAll
router.get('/getProducts', verifyisAdmin,  async (req, res)=>{
    try{
        const data = await Product.find();
        res.status(200).json(data)

    }catch(error){
        res.status(500).json({message: error.message})
    }
    
});

// url/api/getProduct/5
router.get('/getProduct/:id', async (req, res)=>{

   try{
        const data = await Product.findById(req.params.id);
        res.status(200).json(data)

    }catch(error){
        res.status(500).json({message: error.message})
    }
});

// url/api/update/5
router.put('/updateProduct/:id', async (req, res)=>{

    try{
        //const id = req.params.id;
        const updateData = req.body;
        const options = {new: true};

        const result = await Product.findByIdAndUpdate(req.params.id, updateData, options);
        res.status(200).json(result)

    }catch(error){
        res.status(500).json({message: error.message})
    }
});

// url/api/delete/5
router.delete('/deleteProduct/:id', async (req, res)=>{
    try{
      

        const result = await Product.findByIdAndDelete(req.params.id);
        res.send(` ${result.productname} successfully deleted!`)

    }catch(error){
        res.status(400).json({message: error.message})
    }
});

module.exports = router;