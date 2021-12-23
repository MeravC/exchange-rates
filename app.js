const express = require('express');
const app = express();
const exchangeRatesRoutes = require('./api/routes/exchange-rates.js');
const getDataRoutes = require('./api/routes/getData.js');
const deleteDataRoutes = require('./api/routes/deleteData.js');

app.use('/exchange-rates',exchangeRatesRoutes);
app.use('/getData',getDataRoutes);
app.use('/deleteData',deleteDataRoutes);

app.use((req,res,next)=>{
    const error = new Error("Error found"); 
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;