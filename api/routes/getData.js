const express = require('express');
const router = express.Router();
const fs = require('fs')



router.get('/',(req,res,next)=>{
    fs.readFile('myExchangeRateFile.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
            return
        }
        data = JSON.parse(data);
        let date = new Date();
        let minAgo = 1;
        let response = [];
        let currentMin = date.getMinutes();
        while(minAgo <= 5){
            date.setMinutes(currentMin - minAgo);
            const dateKey = new Date(date).toISOString().substring(0,16);
            response.push({"date" : dateKey, "info" : data[dateKey]});
            minAgo++;
        }
        res.status(200).json(
            response
        );
      })
});


router.get('/:fromCurrency/:toCurrency',(req,res,next)=>{
    const fromCurrency = req.params.fromCurrency;
    const toCurrency = req.params.toCurrency;
    fs.readFile('myExchangeRateFile.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
            return
        }
        data = JSON.parse(data);
        let date = new Date();
        let minAgo = 1;
        let response = [];
        let currentMin = date.getMinutes();
        while(minAgo <= 5){
            date.setMinutes(currentMin - minAgo);
            const dateKey = new Date(date).toISOString().substring(0,16);
            if(data[dateKey]){
                response.push({"date" : dateKey, "info" : data[dateKey].find(data => data.id === fromCurrency && data.toCurrency === toCurrency)});
            }
            minAgo++;
        }
        res.status(200).json(
            response
        );
      })
});


router.get('/:timeFrame',(req,res,next)=>{
    const timeFrame = req.params.timeFrame;
    fs.readFile('myExchangeRateFile.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
            return
        }
        data = JSON.parse(data);
        let date = new Date();
        let minAgo = 1;
        let response = [];
        let currentMin = date.getMinutes();
        while(minAgo <= timeFrame){
            date.setMinutes(currentMin - minAgo);
            const dateKey = new Date(date).toISOString().substring(0,16);
            response.push({"date" : dateKey, "info" : data[dateKey]});
            minAgo++;
        }
        res.status(200).json(
            response
        );
    })
});

module.exports = router;