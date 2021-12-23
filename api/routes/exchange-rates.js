const express = require('express');
const router = express.Router();
const fs = require('fs');
const axios = require('axios');

async function getExRates(fromCurrency, toCurrency){
    try{
        const res = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency=' + fromCurrency);
        const dateKey = new Date().toISOString().substring(0,16);
        
        const exchangeRate = res.data;
        const dataFromFile = fs.readFileSync('myExchangeRateFile.json');
        let myExchangeRate = JSON.parse(dataFromFile);
        const id = fromCurrency + "to"+ toCurrency;
        if(myExchangeRate[dateKey]){
            myExchangeRate[dateKey].push({id, fromCurrency, toCurrency, "theRate": exchangeRate.data.rates[toCurrency]});
        }else{
            myExchangeRate[dateKey] = [{id, fromCurrency, toCurrency, "theRate": exchangeRate.data.rates[toCurrency]}];
        }
        fs.writeFileSync("myExchangeRateFile.json",JSON.stringify(myExchangeRate,null,2));
        console.log("File written successfully\n");

    }catch(err) {
        console.log('Error: ', err.message);
    }
}

setInterval( () => getExRates('BTC', 'USD'), 60000);
setInterval( () => getExRates('BTC', 'EUR'), 60000);
setInterval( () => getExRates('ETH', 'USD'), 60000);
setInterval( () => getExRates('ETH', 'EUR'), 60000);


module.exports = router;