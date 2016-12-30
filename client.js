const net = require('net');

let client = net.createConnection(8080, '0.0.0.0');

client.on('connect', () => {
  console.log('connected to server');
  // process.stdin.pipe(client);
});

client.on('data', (chunk) => {
  // fs
});

client.on('end', () => {
  console.log('disconnected from server');
});