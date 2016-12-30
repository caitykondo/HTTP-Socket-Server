const net = require('net');
const _404 = require('./404.js');
const helium = require('./helium.js');
const hydrogen = require('./hydrogen.js');
const index = require('./index.js');
const styles = require('./styles.js');


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

    if(requestMethod === 'HEAD') {
      socket.write(header); //the returned header
      socket.end();
    }
    else if(requestMethod === 'GET') {
      socket.write("\n" + header + "\n");
      if(requestURI === '/helium.html') {
        socket.write(helium);
      } else if(requestURI === '/hydrogen.html') {
        socket.write(hydrogen);
      } else if(requestURI === '/index.html' || '/');
      socket.write(index);
      socket.end();
    }
  });

  socket.on('end', () => {
    console.log('client disconnected');
  });

});

server.on('error', (err) => {
  throw err;
});

server.listen(8080, '0.0.0.0', () => {
  console.log('opened server on ', server.address());
});