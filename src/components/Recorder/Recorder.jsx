import React, { Component } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';


const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Recorder extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
    }
  }

  start = () => {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        this.setState({ blobURL, isRecording: false });
      }).catch((e) => console.log(e));
  };

  componentDidMount(){
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true })
      },
    );  
  }

  render() {
    
    return (
      <div> 
      <Button  onClick = {this.start} disabled = {this.state.isRecording} text = 'Record'/>
      <Button  onClick = {this.stop} disabled = {!this.state.isRecording} text = 'Stop'/>
      <audio src={this.state.blobURL} controls="controls" />
      </div>
    );
  }
  
}

const Button = props =>(
  <button onClick={props.onClick} disabled={props.disabled}>
        {`${props.text}`}
  </button>
)


export default Recorder;
