import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderView from './components/headerView.react.js'

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="container">
            <HeaderView/>
          </div>
          <div className="container">
            <div className="jumbotron rounded border p-3">
            {/*main content*/}
            </div>
          </div>
      </div>
    );
  }
}

export default App;
