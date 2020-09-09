import React, { Component } from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import './App.css';
import HeaderView from './components/HeaderView.react.js';
import Flights from './components/Flights.react.js';
import Home from './components/Home.react.js';
import Hotels from './components/Hotels.react.js';
import Login from './components/Login.react.js';
import Teleportation from './components/Teleportation.react.js';
import User from './components/User.react.js';
import Error from './components/Error.react.js';
import RequireAuth from './components/RequireAuth.react.js';
import reducers from './reducers' //calls exports from reducers file

class App extends Component {

  render() {
    const store = createStore(
      reducers,
      {
        login: { token: localStorage.getItem('token'), username: localStorage.getItem('username') }
      },
      applyMiddleware(reduxThunk)
    );

    return (
      <Provider store={store}>
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
                  <Route path='/login' component={Login}/>
                  <Route path='/user' component={RequireAuth(User)}/>
                  <Route component={Error}/>
                </Switch>
              </div>
            </div>
        </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
