import './App.scss';
import NavBar from './NavBar';
import Network from './Network';
import TrainedNetwork from './TrainedNetwork';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import socketClient from 'socket.io-client';

const socket = socketClient('http://127.0.0.1:8080');

// Classroom code specified in URL
const url = window.location.pathname.split('/');
if (url[1] && url[1] !== 'trained') {
  socket.emit('join-classroom', url[1]);
}

function App(props) {

  const [classroom, setClassroom] = React.useState({});

  // Receive from socket
  React.useEffect(() => {
    socket.on('classroom-updated', (classroom) => {
      setClassroom(classroom);
      window.history.pushState('', '', classroom.code);
    });
  });

  // Send to socket
  const onCommand = (command) => {
    if (command === 'create-classroom') {
      socket.emit('create-classroom');
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="*/trained">
            <NavBar title="Test a Trained Network" classroom={classroom} onCommand={onCommand} />
            <TrainedNetwork />
          </Route>
          <Route path="/">
            <NavBar title="Build a Neural Network" classroom={classroom} onCommand={onCommand} />
            <Network />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
