import React, { Component } from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';

import './App.css';
import HeaderView from './components/HeaderView.react.js';
import Flights from './components/Flights.react.js';
import Home from './components/Home.react.js';
import Hotels from './components/Hotels.react.js';
import Teleportation from './components/Teleportation.react.js';
import Error from './components/Error.react.js';

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/projects/Zzpace-React/">
      <div className="app">
          <div className="container">
            <HeaderView/>
          </div>
          <div className="container">
            <div className="jumbotron rounded border p-3">
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/flights' component={Flights}/>
                <Route path='/hotels' component={Hotels}/>
                <Route path='/teleportation' component={Teleportation}/>
                <Route component={Error}/>
              </Switch>
            </div>
          </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
