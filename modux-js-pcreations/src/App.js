import React, { Component } from 'react';
import moduxFactory from 'modux-js';

import logo from './logo.svg';
import './App.css';
import DevTools from './DevTools';
import root from './root'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div style={{ textAlign: 'left' }}>
          <DevTools/>
        </div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <root.view/>
        </p>
      </div>
    );
  }
}

export default App;
