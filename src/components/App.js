import './App.scss';
import Alert from './Alert';
import NavBar from './NavBar';
import Network from './Network';
import Stats from './Stats';
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

  const [messages, setMessages] = React.useState([]);
  const [appData, setAppData] = React.useState({
    connected: false,
    classroom: false,
    userId: false
  });

  // Receive from socket
  React.useEffect(() => {
    socket.on('connect', () => {
        appData.connected = true;
        setAppData(appData);
    });

    socket.on('disconnect', () => {
        appData.connected = false;
        setAppData(appData);
    });

    socket.on('user-id', (userId) => {
      appData.userId = userId;
      setAppData(appData);
    });

    socket.on('classroom-updated', (classroom) => {
      appData.classroom = classroom;
      setAppData(appData);
      window.history.pushState('', '', classroom.code);
    });

    socket.on('error', (error) => {
      alert(error, 'error');
    });
  });

  // Send to socket
  const onCommand = (command) => {
    if (command === 'create-classroom') {
      socket.emit('create-classroom');
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="*/trained">
            <NavBar title="Test a Pre-trained Model" appData={appData} route="trained" onCommand={onCommand} />
            <TrainedNetwork />
          </Route>
          <Route path="*/stats">
            <NavBar title="View Classroom Stats" appData={appData} route="stats" onCommand={onCommand} />
            <Stats />
          </Route>
          <Route path="/">
            <NavBar title="Build a Neural Network" appData={appData} route="build" onCommand={onCommand} />
            <Network />
          </Route>
        </Switch>
        <Alert />
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
