const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection
const product = require('./routes/product');
const user = require('./routes/user');
const auth = require('./routes/auth');


database.on('error', (error)=>{
    console.log(error);
});

database.once('connected', ()=>{
    console.log('Database Connected');
});

const app = express();
app.use(express.json());
app.use('/api/product', product)
app.use('/api/user', user)
app.use('/api/auth', auth)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
});

