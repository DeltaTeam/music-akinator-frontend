import React, { Component } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});


class Recorder extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
      isRecorded: false
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
      this.setState({isRecorded: true})
  };

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
      <div> 
        <CreateRecord isRecorded = {this.state.isRecorded} isRecording = {this.state.isRecording} start = {this.start} stop = {this.stop} isRecording = {this.state.isRecording}/>
        <ListenRecord isRecorded = {this.state.isRecorded} src={this.state.blobURL} />
      </div>
    );
  }
  
}


// const Button = props =>(
//   <button onClick={props.onClick} disabled={props.disabled}>
//         {`${props.text}`}
//   </button>
// )

function ListenRecord(props) {
  const isRecorded = props.isRecorded;
  if (isRecorded){
    return <div><audio src={props.src} controls="controls" /></div>
  }
  return <div/>
}

function CreateRecord(props){
  const classes = useStyles();
  const isRecorded = props.isRecorded;
  const isRecording = props.isRecording;
  if (!isRecorded){
    if(!isRecording){
      return <div>
        <Button className={classes.root} onClick = {props.start}>Start</Button>
        </div>
    }
    return <div>  
      <Button className={classes.root} onClick = {props.stop}>Stop</Button>
    </div>
  }
  return <div/>
}

export default Recorder;
