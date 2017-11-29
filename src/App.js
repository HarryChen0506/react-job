import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from 'antd-mobile';
import Counter from 'container/Counter.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React, Harry</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button type="primary">按钮</Button>
        <Counter />

      </div>
    );
  }
}

export default App;
