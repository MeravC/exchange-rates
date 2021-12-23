const http = require('http');
const myApp = require('./app');
require('dotenv').config();
const port = process.env.PORT;
const server = http.createServer(myApp);


server.listen(port, () => {
  console.log(`App listening on port ${port}!`)
});