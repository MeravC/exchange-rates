const express = require('express');

const myApp = require('./app');
require('dotenv').config();
const port = process.env.PORT;
const server = express().use(myApp);


server.listen(port, () => {
  console.log(`App listening on port ${port}!`)
});