const io = require('socket.io-client');


var socket = io('https://riff-poc.riffplatform.com/');
// var socket = io('riff-poc.riffplatform.com:443');
// var socket = io('https://sg0xm.sse.codesandbox.io/');
socket.on('connect', ()=>console.log('connected!'));
