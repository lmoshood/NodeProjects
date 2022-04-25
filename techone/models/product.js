const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    productname: { required: true, type: String},
    price: { required: true, type: Number},
    Description:  String
   
})

module.exports = mongoose.model('products', dataSchema)