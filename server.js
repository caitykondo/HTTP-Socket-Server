const net = require('net');

const server = net.createServer((socket) => {
  // 'connection' listener
  console.log('client connected');
  socket.setEncoding('utf8');

  socket.on('data', function(chunk) {
    let requestArr = chunk.split(' ');
    let requestMethod = requestArr[0];
    let requestURI = requestArr[1];
    let date = new Date().toUTCString();
    // console.log(requestArr);
    // console.log(requestMethod);
    // console.log(requestURI);
    // console.log(socket.address());

    // if method = get then return info on URI page
    // if(requestMethod === 'GET') {
    //   console.log(requestURI);
    //   socket.write(`HTTP/1.1 200 OK
    //     Date: 12,
    //     Server: ServerName
    //   `);
    // }

    // Request Line: [METHOD] [Request URI] [HTTP Version]
    // Blank Space
    // Request Header: key value pairs separated by :
    // if(requestMethod === 'GET') {
      console.log(chunk);
      // socket.write('HTTP/1.1\n' + 'Date: ' + date + '\n' + 'Server: ServerName');
      socket.write('HTTP/1.1\n' + 'Date: ' + date + '\n' + 'Server: ServerName');

    // }
  // console.log('GET ' + requestURI + ' HTTP/1.1' + '\n\n' + 'Date: ' + new Date().toUTCString() + '\n' + 'Server: ServerName');

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