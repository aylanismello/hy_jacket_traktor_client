const spawn = require('child_process').spawn;
const py = spawn('python', ['python.py']);
const data = [1,2,3,4,5,6,7,8,9];
let dataString = '';

py.stdout.on('data', function(data) {
    dataString += data.toString();
});

py.stdout.on('end', function(data){
    console.log('Sum of numbers = ', dataString);
});

py.stdin.write(JSON.stringify(data));
py.stdin.end();
