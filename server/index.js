//server.js
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
   console.log('connected to server');

  socket.on('CH01', (from, msg) => {
    console.log('MSG', from, ' saying ', msg);
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
