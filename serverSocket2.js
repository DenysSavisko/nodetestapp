const http = require("http");
const app = require("express")();
const server = http.createServer(app);
const io = require("socket.io")(server);
io.path('/emotions-server');

server.listen(3334);

io.on("connection", (socket) => {
  console.log("socket connected");
  // mockSendingData(socket, 2000);

  // when get emotions data, send to all except sender
  socket.on("emotions results", (msg) => {
    console.log('got emotions results');
    socket.broadcast.emit("emotions data", msg);
  });
});

function mockSendingData(socket, ms) {
  const emotionsMockData = {
    participantId: "default",
    "face:0": {
      avg_scores: {
        Anger: 0.002924130060932839,
        Disgust: 2.0234379292105587e-6,
        Fear: 0.03276854039177124,
        Happiness: 0.8510924875736237,
        Neutral: 0.05916073537746758,
        Sadness: 0.012546194733658922,
        Surprise: 0.04150586749024918
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
    console.log('send mock emotions data');
    socket.emit("emotions data", emotionsMockData);
    mutateData(emotionsMockData);
  }, ms);
}
