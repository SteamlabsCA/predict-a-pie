import './App.scss';
import Alert from './Alert';
import NavBar from './NavBar';
import Network from './Network';
import Prompt from './Prompt';
import Reclassify from './Reclassify';
import SelectRecipe from './SelectRecipe';
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
  const [recipe, setRecipe] = React.useState(new Array(19).fill(0));
  const [recipes, setRecipes] = React.useState([]);
  const [reclassify, setReclassify] = React.useState(false);

  // Load pre-generated recipes
  React.useEffect(() => {
    fetch('recipes.json').then(function(response){
      console.log(response)
      return response.json();
    }).then(function(myJson) {
      console.log(myJson);
      setRecipes(myJson)
    });
  }, []);

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
  }, []);

  const onCommand = (command) => {
    switch (command) {

      case 'create-classroom':
        socket.emit('create-classroom');
        break;

      case 'save-recipe':
        prompt('Recipe name').then(name => {
          socket.emit('save-recipe', {
            name: name,
            ingredients: appData.recipe
          });
        });
        break;
    }
  };

  const onChange = (inputs) => {
    setRecipe(inputs);
  };

  const onFindRecipe = (type) => {
    if (type === 'Random') {
      setRecipe(
        Object.values(
          recipes[Math.floor(Math.random() * recipes.length)]
        ).slice(0, 19)
      );
    } else {
      const subset = recipes.filter(recipe => {
        return recipe[type] === 1;
      });
      if (subset.length > 0) {
        setRecipe(
          Object.values(
            subset[Math.floor(Math.random() * subset.length)]
          ).slice(0, 19)
        );
      }
    }
    setReclassify(true);
  };

  const onReclassify = () => {
    setReclassify(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="*/trained">
            <NavBar
              title="Test a Pre-trained Model"
              appData={appData}
              route="trained"
              onCommand={onCommand}
              content={(<SelectRecipe onSubmit={onFindRecipe}/>)}
            />
            <TrainedNetwork onChange={onChange} inputs={recipe} />
            <Reclassify recipe={recipe} visible={reclassify} onReclassify={onReclassify}/>
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
        <Prompt />
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
