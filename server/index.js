//server.js
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;


io.on('connection', (socket) => {
   console.log('connected to server');

  socket.on('CH01', (from, msg) => {
    console.log('MSG', from, ' saying ', msg);
  });

});

http.listen(PORT, () => {
  console.log(`listening on port *:${PORT}`);
});
