const net = require('net');
const PORT = process.env.PORT || 8080;


let client = net.createConnection(PORT);

client.on('connect', () => {
  console.log('connected to server');
});

client.on('data', (chunk) => {
});

client.on('end', () => {
  console.log('disconnected from server');
});