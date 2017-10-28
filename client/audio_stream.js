var record = require('node-record-lpcm16')
var fs = require('fs')

var file = fs.createWriteStream('test.wav', { encoding: 'binary' })

record.start().pipe(file)

// Stop recording after three seconds
setTimeout(function () {
  record.stop()
}, 3000)

// const fs = require('fs');
// const audio = require('osx-audio');
//
// const input = new audio.Input();
//
// const writable = fs.createWriteStream('output.wav');
// input.pipe(writable);
