import React, { Component } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import '../../styles/RecorderStyle/Record.css';
import ListenRecord from './ListenRecord';
import CreateRecord from './CreateRecord';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Recorder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
      isRecorded: false,
      text: '',
      isTextChosen: false
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
        const blobURL = URL.createObjectURL(blob);
        this.setState({ blobURL, isRecording: false });})
        .catch((e) => console.log(e));
        this.setState({isRecorded: true});

  
  // const file = new File(buffer, 'me-at-thevoice.mp3', {
  //   type: blob.type,
  //   lastModified: Date.now()
  // });
  // console.log(file);
  // console.log(blob);
  // console.log(buffer);
  // const urlFile = URL.createObjectURL(file);
  // this.setState({ urlFile, isRecording: false });
  // console.log(urlFile);
  // const player = new Audio(urlFile);
  // player.play();
  //     }).catch((e) => console.log(e));
  //     this.setState({isRecorded: true})
      };

      rewrite = () => {
        this.setState(
          {
            isRecording: false,
            blobURL: '',
            isBlocked: false,
            isRecorded: false
          }
        );
      }
  
  handleSubmit = () => {
    console.log(this.state.blobURL);
  }

  componentDidMount(){  
    navigator.getUserMedia = (
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
  );
  
    if (typeof navigator.mediaDevices.getUserMedia === 'undefined') {
        navigator.getUserMedia({
            audio: true
        },() => {
          console.log('Permission Denied');
          this.setState({ isBlocked: true })
        });

    } else {
        navigator.mediaDevices.getUserMedia({
            audio: true
        },() => {
          console.log('Permission Denied');
          this.setState({ isBlocked: true })
        })  
    }
  }
  render() {
    return (
      <div className = 'Recorder'> 
        <CreateRecord isRecorded={this.state.isRecorded} isRecording={this.state.isRecording} start={this.start} stop={this.stop} isRecording={this.state.isRecording}/>
        <ListenRecord isRecorded={this.state.isRecorded} src={this.state.blobURL} rewrite = {this.rewrite} handleSubmit = {this.handleSubmit}/>
      </div>
    );
  }
}
export default Recorder;
