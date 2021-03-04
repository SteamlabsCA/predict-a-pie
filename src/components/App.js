import './App.scss';
import Alert from './Alert';
import ClassroomCode from './ClassroomCode';
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

//const socket = socketClient();
const socket = socketClient('http://127.0.0.1:8080');

// Classroom code specified in URL
const url = window.location.pathname.split('/');
if (url[1] && (!['trained', 'stats'].includes(url[1]))) {
  socket.emit('join-classroom', url[1]);
}

// Ingredients
export const ingredients = [
  'Crust',
  'Sugar',
  'Honey',
  'Chocolate',
  'Cherries',
  'Strawberry',
  'Pineapple',
  'Rhubarb',
  'Tomato',
  'Corn',
  'Onion',
  'Spinach',
  'Pumpkin',
  'Broccoli',
  'Mushroom',
  'Hot Peppers',
  'Sweet Potato',
  'Cheese',
  'Blue Cheese',
  'Egg',
  'Chicken',
  'Ham',
  'Steak',
  'Salmon',
  'Shrimp',
  'Soy Chunks',
  'Pecan',
  'Pesto'
];

// Classifications
export const classifications = [
  'Sweet',
  'Quiche',
  'Pizza',
  'Savoury',
  'Disgusting'
];

function App(props) {

  const [appData, setAppData] = React.useState({
    connected: false,
    classroom: false,
    userId: false
  });
  const [classroomCode, setClassroomCode] = React.useState(false);
  const [recipe, setRecipe] = React.useState(new Array(19).fill(0));
  const [recipes, setRecipes] = React.useState([]);
  const [discuss, setDiscuss] = React.useState(true);
  const [classification, setClassification] = React.useState(0);
  const [reclassify, setReclassify] = React.useState(false);

  // Load pre-generated recipes
  React.useEffect(() => {
    fetch('/recipes.json').then(function(response){
      return response.json();
    }).then(function(json) {

      // Shuffle recipes
      for (let i = json.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [json[i], json[j]] = [json[j], json[i]];
      }

      setRecipes(json)
    });
  }, []);

  // Receive from socket
  React.useEffect(() => {
    socket.on('connect', () => {
        appData.connected = true;
        setAppData({...appData});
    });

    socket.on('disconnect', () => {
        appData.connected = false;
        setAppData({...appData});
    });

    socket.on('user-id', (userId) => {
      appData.userId = userId;
      setAppData({...appData});
    });

    socket.on('classroom-created', (code) => {
      setClassroomCode(code);
      window.history.pushState('', '', '/' + code);
    });

    socket.on('classroom-joined', (code) => {
      window.history.pushState('', '', '/' + code);
    });

    socket.on('classroom-updated', (classroom) => {
      appData.classroom = classroom;
      setAppData({...appData});
    });

    socket.on('error', (error) => {
      alert(error, 'error');
    });
  }, []);

  const onCommand = (command) => {
    switch (command) {

      case 'join-classroom':
        prompt('Enter classroom code').then(code => {
          socket.emit('join-classroom', code);
        });
        break;

      case 'leave-classroom':
        appData.classroom = false;
        window.history.pushState('', '', '/');
        setAppData({...appData});
        socket.emit('leave-classroom');
        break;

      case 'create-classroom':
        socket.emit('create-classroom');
        break;

      case 'save-recipe':
        prompt('Enter recipe name').then(name => {
          socket.emit('save-recipe', {
            name: name,
            ingredients: recipe,
            classification: classification
          });
        });
        break;
    }
  };

  const onChange = (inputs) => {
    setReclassify(false);
    setRecipe(inputs);
  };

  const onPrediction = (output) => {
    setClassification(output)
  };

  const onFindRecipe = (type, discuss = true) => {
    setReclassify(false);

    // Find first suitable recipe
    if (recipes.length > 0) {
      for (let index = 0; index < recipes.length; index++) {
        if (
          (!discuss || recipes[index].Discuss === 1) &&
          (type === 'Random' || recipe[type] === 1)
        ) {
          const item = recipes.splice(index, 1)[0];
          setRecipe(Object.values(item).slice(0, ingredients.length));
          setTimeout(() => setReclassify(true), 1000);
          return;
        }
      }
      if (discuss) {
        onFindRecipe(type, false);
      }
    }
  };

  const onReclassify = (recipe, reclassification) => {
    if (reclassification < 0) {
      reclassification = classification;
    }
    socket.emit('reclassify-recipe', {
      recipe: recipe,
      original_classification: classification,
      reclassification: reclassification
    });
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
              content={(<SelectRecipe classifications={classifications} onSubmit={onFindRecipe}/>)}
            />
            <TrainedNetwork
              onChange={onChange}
              onPrediction={onPrediction}
              inputs={recipe}
              ingredients={ingredients}
              classifications={classifications}
            />
            <Reclassify
              recipe={recipe}
              classifications={classifications}
              visible={reclassify}
              onReclassify={onReclassify}
            />
          </Route>
          <Route path="*/stats">
            <NavBar title="Classroom Stats" appData={appData} route="stats" onCommand={onCommand} />
            <Stats
              appData={appData}
              ingredients={ingredients}
              classifications={classifications}
              recipes={recipes}
            />
          </Route>
          <Route path="/">
            <NavBar title="Build a Neural Network" appData={appData} route="build" onCommand={onCommand} />
            <Network />
          </Route>
        </Switch>
        <Alert />
        <Prompt />
        <ClassroomCode code={classroomCode} appData={appData} onDismiss={() => setClassroomCode(false)} />
      </div>
    </BrowserRouter>
  );
}

export default App;
