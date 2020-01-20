import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Recorder from './Recorder.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button variant="contained" color="primary"  id="record" onClick={btnAlert}>
            Record
          </Button>
          <Button variant="contained" color="secondary" id="stop" onClick={btnAlert}>
            Stop
          </Button>
          <Button variant="contained" color="primary"  id="play" onClick={btnAlert}>
            Play
          </Button>
          <Button variant="contained" color="primary"  id="load" onClick={btnAlert}>
            Load
          </Button>
        </ButtonGroup>
      </div>
    );
  }
  
}

function btnAlert() {
  alert("it Works! " + Recorder);
}

export default App;
