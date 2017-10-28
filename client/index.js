const io = require('socket.io-client');
// https://www.npmjs.com/package/socket.io-stream
const ss = require('socket.io-stream');
// https://github.com/gillesdemey/node-record-lpcm16
const record = require('node-record-lpcm16')
const fs = require('fs')

const HEROKU_DROPLET_URL = 'http://162.243.144.110';
const url = process.env.NODE_ENV === 'production' ? HEROKU_DROPLET_URL : 'http://localhost:3000';

const socket = io.connect(url, {reconnect: true});

// Add a connect listener
const easymidi = require('easymidi');
const inputs = easymidi.getInputs();
const outputs = easymidi.getOutputs();

const audioStream = ss.createStream();
  // 24 clock pulses per quarter note!
  // 96 clock pulses per downbeat!
const PULSES_PER_BEAT = 24;
console.log(inputs);
console.log(outputs);

const traktor = new easymidi.Input(inputs[2]);
let beat = 1;
let tick = 0;

socket.on('connect', () => {
  ss(socket).emit('audio', audioStream, { name: 'whatever'})
  record.start().pipe(audioStream);

  console.log('connected to socket server');
  traktor.on('clock', () => {
    if(tick % PULSES_PER_BEAT === 0) {
      socket.emit('tick', 'traktor', beat);
      console.log(beat);
      if(beat === 4) {
        beat = 1;
      } else {
        beat++;
      }
    }
    tick++;
  });
});

socket.on('tick', (data) => {
  console.log(data);
});
