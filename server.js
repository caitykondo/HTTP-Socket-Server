const net = require('net');
const _404 = require('./404.js');
const helium = require('./helium.js');
const hydrogen = require('./hydrogen.js');
const index = require('./index.js');
const styles = require('./styles.js');

const PORT = process.env.PORT || 8080;

const server = net.createServer((socket) => {
  console.log('client connected');
  socket.setEncoding('utf8');

  socket.on('data', function(chunk) {
    let requestArr = chunk.split(' ');
    let requestMethod = requestArr[0];
    let requestURI = requestArr[1];
    let date = new Date().toUTCString();
    let header = "HTTP/1.1\n" + "Server-Name: ThisServer\nDate: " + date + "\n";

    if(requestMethod === 'HEAD') {
      socket.write(header);
      socket.end();
    }
    else if(requestMethod === 'GET') {
      socket.write(header + "\n");
      if(requestURI === '/helium.html') {
        socket.write(helium);
      } else if(requestURI === '/hydrogen.html') {
        socket.write(hydrogen);
      } else if(requestURI === '/index.html' || requestURI === '/'){
        socket.write(index);
      } else {
        socket.write(_404);
      }
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

server.listen(PORT, () => {
  console.log('opened server on ', server.address());
});