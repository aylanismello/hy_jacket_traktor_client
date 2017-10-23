const easymidi = require('easymidi');
const inputs = easymidi.getInputs();
const outputs = easymidi.getOutputs();
const io = require('socket.io-client');

const PULSES_PER_BEAT = 24;
const socket = io.connect('http://localhost:3000', {reconnect: true});
console.log(inputs);
console.log(outputs);

const traktor = new easymidi.Input(inputs[2]);
let beat = 1;
let tick = 0;
let sound = 'tick';

//
// traktor.on('clock', () => {
//   if(tick % PULSES_PER_BEAT === 0) {
//     console.log(beat);
//     if(beat === 4) {
//       beat = 1;
//     } else {
//       beat++;
//     }
//   }
//   tick++;
// });


socket.on('connect', function (socket) {
    console.log('Connected!');
});
socket.emit('CH01', 'me', 'test msg');

// const ws = new WebSocket('ws://127.0.0.1:3000/socket');
//
// let MIDIStream = null;
//
// ws.on('open', () => {
//   console.log('ssup!');
//   ws.send('hello');
//
//   // 24 clock pulses per quarter note!
//   // 96 clock pulses per downbeat!
//
//
// });



// client.on('open', () => {
//   const s = client.createStream();
//   s.write('sup');
// });
  // console.log('dope');
  // MIDIStream = client.createStream();
  // MIDIStream.on('data', (data) => {
  //   console.log(`receive audio data ${data}`);
  // });
  //
  // MIDIStream.on('end', (data) => {
  //   console.log(`end ${data}`);
  // });
