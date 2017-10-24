/**
 * Module dependencies.
 */

var express = require('express')
logger = require('morgan'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
  // , routes = require('./routes')
http = require('http');

var app = express();
var io = require('socket.io').listen(server); // this tells socket.io to use our express server
var server = app.listen(3000, '0.0.0.0');
const router = express.Router();

// app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(bodyParser());
  app.use(methodOverride());
  app.use(router);
// });

// app.configure('development', function(){
//   app.use(express.errorHandler());
// });

app.get('/', (req, res) => {
  res.send('hello world');
});


console.log("Express server listening on port 3000");

// //server.js
// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// const PORT = process.env.PORT || 3000;
//
//
// io.on('connection', (socket) => {
//    console.log('connected to server');
//
//   socket.on('tick', (from, msg) => {
//     console.log('MSG from', from, ' saying ', msg);
//     socket.emit('tick', { msg: msg });
//   });
//
// });
//
// http.listen(PORT, () => {
//   console.log(`listening on port *:${PORT}`);
// });
