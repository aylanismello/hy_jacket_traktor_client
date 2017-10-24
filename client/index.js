var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', {reconnect: true});
// var socket = io.connect('http://midi-testz.herokuapp.com:3000', {reconnect: true});

// Add a connect listener
const easymidi = require('easymidi');
const inputs = easymidi.getInputs();
const outputs = easymidi.getOutputs();

  // 24 clock pulses per quarter note!
  // 96 clock pulses per downbeat!
const PULSES_PER_BEAT = 24;
console.log(inputs);
console.log(outputs);

const traktor = new easymidi.Input(inputs[2]);
let beat = 1;
let tick = 0;
let sound = 'tick';

socket.on('connect', () => {
  traktor.on('clock', () => {
    if(tick % PULSES_PER_BEAT === 0) {
      socket.emit('CH01', 'me', beat);
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
