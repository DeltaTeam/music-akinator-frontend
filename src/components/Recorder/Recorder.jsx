import React, { Component } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import '../../styles/RecorderStyle/Record.css';
import ListenRecord from './ListenRecord';
import CreateRecord from './CreateRecord';
import '../../styles/GamesStyles/Game.css';
import auddIO from '../../requests/audd';

import AttemptsNumber from './../Game/inputTypePage/AttemptsNumber'


const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Recorder extends Component {
  audd = new auddIO();
  time = new Date();
  // timeStart = 0;
  timeStart = this.time.getTime();
  maxLengthSong = 20;
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      isBlocked: false,
      isRecorded: false,
      response: '',
      responseIsReady: false,
      file: {},
      fileIsReady: false,
      blobURL: '',
      sended: false
    }
  }

  getSongInfo=()=> {
    return this.state.response;
  }
  getTime=()=>{
    console.log(this.timeStart);
    console.log(this.time.getTime());
    return this.time.getTime() - this.timeStart;
  }

  start = () => {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      this.time = new Date();
      this.timeStart = this.time.getDate();
      // console.log(Mp3Recorder);
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }
  };

  handleResponse = (responseAudd) => {
    this.setState({
      response: responseAudd, responseIsReady: true
    }, () => {
    });
  }

  stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        this.setState({
          file: blob,
          fileIsReady: true
        });

        const blobURL = URL.createObjectURL(blob);
        this.setState({ blobURL, isRecording: false });

      })
      .catch((e) => console.log(e));
    this.setState({ isRecorded: true });
  }

  rewrite = () => {
    this.setState(
      {
        isRecording: false,
        blobURL: '',
        isBlocked: false,
        isRecorded: false,
      }
    );
  }

  sendSong = () => {
    this.setState({
      sended: true
    });
    this.audd.sendAudio(this.handleResponse, this.state.file);
  }
  sendedReset = () => {
    this.setState({
      sended: false,
      responseIsReady: false
    })
  }
  songConvert = (el) => {
    let res = {
      artist: el.result.artist,
      title: el.result.title,
      song: el.result.deezer.preview
    }
    return res;
  }
  incorrectAnswer = () => {
    this.props.attemptsDecrease();
    this.sendedReset();
    let listItem = this.songConvert(JSON.parse(this.state.response));;
    this.props.addSongInList(listItem);
    if (this.props.attempts - 1 === 0) {
      this.props.attemptsReset();
      this.props.incorrect();
    }
  }
  undefinedAnswer = () => {
    this.props.attemptsDecrease();
    this.sendedReset();
    if (this.props.attempts - 1 === 0) {
      this.props.attemptsReset();
      this.props.incorrect();
    }
  }
  correctAnswer = () => {
    let listItem = this.songConvert(JSON.parse(this.state.response));
    this.props.addSongInList(listItem);
    this.props.attemptsReset();
    this.props.correct();
  }

  componentDidMount() {
    navigator.getUserMedia = (
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    );

    if (typeof navigator.mediaDevices.getUserMedia === 'undefined') {
      navigator.getUserMedia({
        audio: true
      }, () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true })
      });

    } else {
      navigator.mediaDevices.getUserMedia({
        audio: true
      }, () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true })
      })
    }
  }

  render() {
    // this.time = new Date();
    // if(this.getTime() > this.maxLengthSong*1000 && this.state.isRecording===true){
    //   console.log(this.getTime());
    //   // this.stop();
    // }
    return (
      <div className='Recorder'>
        <CreateRecord
          isRecorded={this.state.isRecorded}
          isRecording={this.state.isRecording}
          start={this.start} stop={this.stop} />
        <ListenRecord
          isRecorded={this.state.isRecorded}
          sended={this.state.sended}
          src={this.state.blobURL}
          response={this.state.response}
          responseIsReady={this.state.responseIsReady}

          rewrite={this.rewrite}
          sendSong={this.sendSong}
          incorrectAnswer={this.incorrectAnswer}
          correctAnswer={this.correctAnswer}
          undefinedAnswer={this.undefinedAnswer} />
        <AttemptsNumber attempts={this.props.attempts} />
      </div>
    );
  }
}

export default Recorder;
