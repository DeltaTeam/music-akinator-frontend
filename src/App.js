import React, { Component } from 'react';
import Recorder from './components/Recorder/Recorder';
import './App.css';
import './styles/RecorderStyle/Record.css';
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
<<<<<<< HEAD
        <div >
          <Recorder/>
=======
        <div className='Recorder'>
          <Recorder></Recorder>
>>>>>>> 07a12ab06d1239c7935a8e46c9f4a7d9ab100b85
        </div>
      </div>
    );
  }
  
}


export default App;
