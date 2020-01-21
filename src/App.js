import React, { Component } from 'react';
import Recorder from './components/Recorder/Recorder';
import './App.css';
import './styles/RecorderStyle/Record.css';
import 'typeface-roboto';

class App extends Component {
  render() {
    return (
      <div
      style={{
        backgroundColor: 'linear-gradient(to top, rgba(51, 80, 102), rgba(21,32,41))'
      }}
      >
        <div className = 'Recorder'>
          <Recorder/>
        </div>
      </div>
    );
  }
  
}


export default App;
