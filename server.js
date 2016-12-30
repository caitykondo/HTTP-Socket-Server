const net = require('net');
const index = require('./index.js');

const server = net.createServer((socket) => {
  // 'connection' listener
  console.log('client connected');
  socket.setEncoding('utf8');

  socket.on('data', function(chunk) {
    let requestArr = chunk.split(' ');
    let requestMethod = requestArr[0];
    let requestURI = requestArr[1];
    let date = new Date().toUTCString();
    let header = "HTTP/1.1\n" + "Server-Name: ThisServer\nDate: " + date + "\n";
    // console.log(requestArr);
    console.log(requestMethod);
    // console.log(requestURI);
    // console.log(socket.address());

  socket.on('connect', () => {
    console.log('connected!');
  });

    // Request Line: [METHOD] [Request URI] [HTTP Version]
    // Blank Space
    // Request Header: key value pairs separated by :
    if(requestMethod === 'HEAD'){
      socket.write(header); //the returned header
      socket.end();
    }
    else if (requestMethod === 'GET'){
      socket.write(index());
      socket.end();  
    }

  });

  socket.on('end', () => {
    console.log('client disconnected');
  });

  // figure out request method and URI from request head
  // and return that to client

});

server.on('error', (err) => {
  throw err;
});

server.listen(8080, '0.0.0.0', () => {
  console.log('opened server on ', server.address());
});