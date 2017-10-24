//server.js
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
   console.log('connection');

  socket.on('CH01', (from, msg) => {
    console.log('MSG', from, ' saying ', msg);
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

// const app = require("express")();
// const server = require("http").Server(app);
// const io = require("socket.io")(server);
//
// const handleClient = function (socket) {
//     // we've got a client connection
//     socket.emit("tweet", {user: "nodesource", text: "Hello, world!"});
// };
//
// io.on("connection", handleClient);
//
// server.listen(3000, () => {
//   console.log('listening');
// });
