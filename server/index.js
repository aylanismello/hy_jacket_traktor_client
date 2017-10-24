/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http');

var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server); // this tells socket.io to use our express server

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);


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
