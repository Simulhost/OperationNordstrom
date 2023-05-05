const net = require('net');
const fs = require('fs');

const port = 1337;
const hostname = '0.0.0.0';
const logFilePath = 'log.txt';
const loggedIPs = new Set();

const server = net.createServer((socket) => {
  const { remoteAddress } = socket;
  
  if (!loggedIPs.has(remoteAddress)) {
    loggedIPs.add(remoteAddress);
    
    const logEntry = `${new Date().toISOString()} - ${remoteAddress}\n`;

    console.log(logEntry);

    fs.appendFile(logFilePath, logEntry, (err) => {
      if (err) throw err;
    });
  }
});

server.listen(port, () => {
  console.log(`Server listening on hostname ${hostname} and port ${port}`);
});
