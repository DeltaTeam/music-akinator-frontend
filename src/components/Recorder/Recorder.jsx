import React, { Component } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../../styles/RecorderStyle/Record.css';
import Skeleton from '@material-ui/lab/Skeleton';
import Mic from '../../styles/Pictures/mic.svg';
import Stop from '../../styles/Pictures/stop.svg';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const useStyles = makeStyles({
  root: {

  },
  startR:{
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    padding: '0 30px',
    width: '300px',
    height: '36px',
    marginLeft: 'calc(50% - 300px/2 + 0.5px)',
    top: 'calc(50% - 16px/2)',
    borderRadius: '4px',
    /* button */
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '16px',
    /* identical to box height, or 114% */
    textAlign: 'center',
    letterSpacing: '1.25px',
    textTransform: 'uppercase',
    border: 'none',
    color: '#FFFFFF',
    background: '#98BF1F',
  },
  stopR:{
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    padding: '0 30px',
    width: '300px',
    height: '36px',
    marginLeft: 'calc(50% - 300px/2 + 0.5px)',
    top: 'calc(50% - 16px/2)',
    borderRadius: '4px',
    /* button */
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '16px',
    /* identical to box height, or 114% */
    textAlign: 'center',
    letterSpacing: '1.25px',
    textTransform: 'uppercase',
    border: 'none',
    color: '#FFFFFF',
    background: 'red',
  },
  skel:{
    width:300,
    background: 'red',
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
      <div className = 'Recorder'> 
        <CreateRecord isRecorded={this.state.isRecorded} isRecording={this.state.isRecording} start={this.start} stop={this.stop} isRecording={this.state.isRecording}/>
        {/* <RecordingMessage isRecording={this.state.isRecording}/> */}
        <ListenRecord isRecorded={this.state.isRecorded} src={this.state.blobURL} />
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
        <Skeleton className={ classes.skel} animation={false}/>
        <Button className={ classes.startR } onClick={props.start}>Start Recording <img src={Mic} width={36} height={36}/></Button>
        <Skeleton className={ classes.skel} animation={false}/>
        </div>
    }
    return <div>
        <Skeleton className={ classes.skel} />  
        <Button  className = {classes.stopR} onClick={props.stop}>Stop Recording <img src={Stop} width={36} height={36}/></Button>
        <Skeleton className={ classes.skel} />
    </div>
  }
  return <div/>
}

function RecordingMessage(props){
  const isRecording = props.isRecording;
  const classes = useStyles();
    if(isRecording){
      return   <img src={Mic} width={40} height={40}/>
      // <img src={Mic}/>
    }
    return <div/>  

}

export default Recorder;
