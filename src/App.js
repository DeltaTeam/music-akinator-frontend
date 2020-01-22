import React, { Component } from 'react';
import Recorder from './components/Recorder/Recorder';
import './App.css';
import 'typeface-roboto';
import Button from '@material-ui/core/Button';

class App extends Component {
  render() {
    return (
      <div
      style={{
        backgroundColor: 'linear-gradient(to top, rgba(51, 80, 102), rgba(21,32,41))'
      }}
      >
        <div >
          <Recorder/>
        </div>
      </div>
    );
  }
  
}


export default App;
