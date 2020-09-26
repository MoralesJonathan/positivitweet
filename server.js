const express = require('express'),
  server = express(),
  port = process.env.PORT || 8080,
  environment = server.get('env'),
  path = require('path'),
  logger = require('morgan'),
  bodyParser = require('body-parser');

server
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }));
  
  environment == 'development'? server.use(logger('dev')) : server.use(logger('short'));
  

  server.get('/', function(req, res) {
    res.send('Hello world!')
  })

  server.get('/login', function(req, res) {
    res.send('Hello world!')
  })
 

  .listen(port, () => {
    console.log(`Server is running on port ${port} and is running with a ${environment} environment.`);
  });