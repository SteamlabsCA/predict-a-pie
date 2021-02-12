import './App.scss';
import NavBar from './NavBar';
import Network from './Network';
import TrainedNetwork from './TrainedNetwork';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

function App() {

  const socketRef = React.useRef();

  React.useEffect(() => {
    socketRef.current = socketIOClient('http://localhost:8080');
    return socketRef.current.disconnect();
  });

  const onCommand = (command) => {
    console.log(command);
    switch (command) {
      case 'create-class':
        socketRef.current.emit('create-class');
        break;
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/trained">
            <NavBar title="Test a Trained Network" onCommand={onCommand} />
            <TrainedNetwork />
          </Route>
          <Route path="/">
            <NavBar title="Build a Neural Network" onCommand={onCommand} />
            <Network />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
