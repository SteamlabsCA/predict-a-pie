import './App.scss';
import NavBar from './NavBar';
import Network from './Network';
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/trained">
            <NavBar title="Test a Trained Network"/>
          </Route>
          <Route path="/">
            <NavBar title="Build a Neural Network"/>
            <Network />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
