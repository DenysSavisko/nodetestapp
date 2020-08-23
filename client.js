const io = require('socket.io-client');

var socket = io('http://riff-poc.riffplatform.com:4455');
// var socket = io('https://riff-poc.riffplatform.com', {path:'emotions-server'});

socket.on('connect', () => {
  console.log('connected!');
});