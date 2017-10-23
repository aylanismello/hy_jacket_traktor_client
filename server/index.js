const express = require('express');
const ejs = require('ejs');
const path = require('path');
const binaryServer = require('binaryjs').BinaryServer;

const app =  new express();

app.set('PORT', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use('/client', express.static(path.join(__dirname, '../client')));
app.use('/modules', express.static(path.join(__dirname, '../node_modules')));

app.get('/', (req, res) => {
    res.render('index');
});

const server = app.listen(app.get('PORT'), error => {
  if(error) {
    console.log(`server has error ${error}`);
    process.exit(1);
  }

  console.log(`server started and is listening at port ${app.get('PORT')}`)
});

const socket = new binaryServer({
  server: server,
  path: '/socket',
});


socket.on('connection', (client) => {
  console.log(`binary websocket started and is listening on port 3000`)

  client.on('stream', (stream, meta) => {
    stream.on('data', data => {
      console.log(data);
      console.log(client);
      // console.log(socket.clients);
      // Object.keys(socket.clients).map(socketClient => {
      //   console.log('made a stream!');
      //   // debugger;
      //   socket.clients[socketClient].createStream();
      // });
    });

    stream.on('end', () => {
      console.log('end of stream');
    });
  })
})
