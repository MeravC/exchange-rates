const express = require('express');
const router = express.Router();
const fs = require('fs')



router.delete('/:fromCurrency/:toCurrency',(req,res,next)=>{
    const fromCurrency = req.params.fromCurrency;
    const toCurrency = req.params.toCurrency;
    const id = fromCurrency +'to' + toCurrency;
    const dataFromFile = fs.readFileSync('myExchangeRateFile.json');
    let myExchangeRate = JSON.parse(dataFromFile);
    let response = {};
        
    for (let i = 0; i < Object.keys(myExchangeRate).length; i++) {
        response[Object.keys(myExchangeRate)[i]] = myExchangeRate[ Object.keys(myExchangeRate)[i]].filter(element => element.id !== id);
    }
    fs.writeFileSync("myExchangeRateFile.json",JSON.stringify(response, null, 2));
        console.log("File written successfully\n");
        
    res.status(200).json(
        response
    );
});

module.exports = router;