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
  socket.emit('user-id', socket.id);

  // Find participant's classroom
  const findClassroom = () => {
    for (const i in classrooms) {
      if (classrooms[i].participants.includes(socket.id)) {
        return classrooms[i];
      }
    }
  };

  // Notify participants of update to classroom
  const onUpdateClassroom = (classroom) => {
    for (const i in classroom.participants) {
      io.to(classroom.participants[i]).emit('classroom-updated', classroom);
    }
  }

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
    onUpdateClassroom(classrooms[code]);
  });

  // Join classroom
  socket.on('join-classroom', (code) => {
    console.log(code);
    if (classrooms[code]) {
      classrooms[code].participants.push(socket.id);
      console.log(`Joined classroom: ${code}, ${classrooms[code].participants.length} participant(s)`);
      onUpdateClassroom(classrooms[code]);
    }
  });

  // Save recipe
  socket.on('save-recipe', (recipe) => {
    let classroom = findClassroom();
    if (classroom) {
      console.log(`Recipe ${recipe.name} saved in classroom ${classroom.code}`);
      classroom.recipes.push(recipe);
      onUpdateClassroom(classroom);
    }
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
