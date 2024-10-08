const express = require('express');
const app = express();

let serverStartTimestamp;

function startServer(port) {
  app.listen(port, () => {
    console.log(`The server is listening at 127.0.0.1:${port}`);
    serverStartTimestamp = getTimestamp();
  });
}

app.get('/', (req, res) => {
  // Calculate the running time
  const timestamp = getTimestamp();
  const runningTime = timestamp - serverStartTimestamp;
  const runningTimeSeconds = Math.floor(runningTime / 1000);

  // Show log
  const requestIp = req.socket.remoteAddress || 'NA';
  console.log(`${timestamp} Request came from ${requestIp}`);

  // Generate response message
  const responseMessage = `The time now is ${timestamp}<br>\n` +
  `The server is running for ${runningTimeSeconds} seconds<br>\n` +
  `App version ${process.env.npm_package_version}\n`;

  // Sending the response
  res.statusCode = 200;
  res.send(responseMessage);
});

app.get('/fail', (req, res) => {
  // Get query parameters
  const requestQuery = req.query;
  const requestProbability = +requestQuery['probability'];

  // Calculate the probability
  let statusCode = 200;
  if (Math.random() < (requestProbability / 100)) {
    statusCode = 500;
  }

  // Sending the response
  res.statusCode = statusCode;
  res.send(`Status code is ${statusCode}\n`);
});

function getTimestamp() {
  const dateNow = new Date();
  const timestamp = dateNow.getTime();
  return timestamp;
}

module.exports = {startServer, app};
