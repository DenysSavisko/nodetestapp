const io = require('socket.io-client');

let count = 0;

function mockSendingData(socket, ms) {
  const emotionsMockData = {
    participantId: "default",
    "face:0": {
      avg_scores: {
        // Anger: 0.0002924130060932839,
        // Disgust: 2.0234379292105587e-6,
        // Fear: 0.003276854039177124,
        // Happiness: 0.02510924875736237,
        // Neutral: 0.005916073537746758,
        // Sadness: 0.0012546194733658922,
        // Surprise: 0.004150586749024918
      },
      compound: "Love"
    }
  };

  function mutateData(mockData) {
    Object.keys(mockData["face:0"].avg_scores).forEach((el) => {
      mockData["face:0"].avg_scores[el] = Math.random();
    });
  }

  setInterval(() => {
    console.log('send mock emotions data: ' + count++);
    socket.emit("emotions results", emotionsMockData);
    mutateData(emotionsMockData);
  }, ms);
}

// var socket = io('https://riff-poc.riffplatform.com/');
var socket = io('http://riff-poc.riffplatform.com:3000');
// var socket = io('https://sg0xm.sse.codesandbox.io/');

socket.on('connect', () => {
  console.log('connected!');
    mockSendingData(socket, 3000);
});
