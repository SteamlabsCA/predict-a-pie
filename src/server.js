const express = require('express');
const Hashids = require('hashids/cjs');
const bodyParser = require('body-parser')
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

console.log('Server started');
let classCounter = 0;

io.on('connection', (socket) => {

  console.log('New client connected');

  socket.on('create-class', () => {
    const hashids = new Hashids('predict-a-pie', 8, 'abcdefghijklmnopqrstuvwxyz');
    const classCode = hashids.encode(classCounter++);
    console.log(classCode);
    io.emit('class-code', {
      code: classCode
    });
  });

});

server.listen(process.env.PORT || 8080);
