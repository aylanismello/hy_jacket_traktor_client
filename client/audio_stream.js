var fs = require('fs');
var audio = require('osx-audio');

var input = new audio.Input();

var writable = fs.createWriteStream('output.wav');
input.pipe(writable);
