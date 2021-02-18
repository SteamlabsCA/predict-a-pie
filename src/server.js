const express = require('express');
const Hashids = require('hashids/cjs');
const bodyParser = require('body-parser')
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

let counter = 0;
let classrooms = {};

io.on('connection', (socket) => {
  console.log('New client connected');
  io.emit('user-id', socket.id);

  const classroom = () => {
    for (const i in classrooms) {
      if (classrooms[i].participants.includes(socket.id)) {
        return classrooms[i];
      }
    }
  };

  // Create new classroom
  socket.on('create-classroom', () => {
    const hashids = new Hashids('predict-a-pie', 8, 'abcdefghijklmnopqrstuvwxyz');
    const code = hashids.encode(counter++);
    classrooms[code] = {
      code: code,
      hostId: socket.id,
      responses: [],
      recipes: [],
      participants: [socket.id]
    };
    console.log(`Created classroom: ${code}, 1 participant(s)`);
    io.emit('classroom-updated', classrooms[code]);
  });

  // Join classroom
  socket.on('join-classroom', (code) => {
    console.log(code);
    if (classrooms[code]) {
      classrooms[code].participants.push(socket.id);
      console.log(`Joined classroom: ${code}, ${classrooms[code].participants.length} participant(s)`);
      io.emit('classroom-updated', classrooms[code]);
    }
  });

  // Save recipe
  socket.on('save-recipe', (recipe) => {
    if (classroom()) {
      classroom().recipes.push(recipe);
    }
    console.log(classroom());
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');

    // Remove participant from classrooms
    for (const i in classrooms) {
      classrooms[i].participants = classrooms[i].participants.filter(id => id !== socket.id);
      if (classrooms[i].participants.length === 0) {
        console.log(`Closed classroom: ${classrooms[i].code}`);
        delete classrooms[i];
      }
    }
  });
});

server.listen(process.env.PORT || 8080);
console.log('Server started');
