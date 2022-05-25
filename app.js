const config = require('./config');


const express =  require('express');
const app = express().Router();



// to accept json payload
app.use(express.json());




module.exports = app;
