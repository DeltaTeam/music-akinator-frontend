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
      sended: false,
    }
  }

  getSongInfo() {
    return this.state.response;
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

  handleResponse = (responseAudd) => {
    this.setState({
      response: responseAudd, responseIsReady: true
    }, () => {
      // console.log(this.state.response);
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
        }, () => { console.log(this.state.file) });

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
    // this.audd.sendAudio(this.handleResponse, this.state.file);
    this.audd.sendTest(this.handleResponse);
    //Когда будет запрос на сайт, его нужно сюда писать и здесь же проводить анализ угадал сайт или не угадал. Если угадал, то делаем hasWon - тру
  }
  sendedReset = () => {
    this.setState({
      sended: false,
      responseIsReady: false
    })
  }
  incorrectAnswer = () => {
    this.props.attemptsDecrease();
    this.sendedReset();
    this.props.addSongInList(JSON.parse(this.state.response));
    if (this.props.attempts - 1 === 0) {
      this.props.attemptsReset();
      this.props.incorrect();
    }
  }
  correctAnswer = () => {
    this.props.addSongInList(JSON.parse(this.state.response));
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
    return (
      <div className='Recorder'>
        <CreateRecord
          isRecorded={this.state.isRecorded}
          isRecording={this.state.isRecording}
          start={this.start} stop={this.stop}
          isRecording={this.state.isRecording} />
        <ListenRecord
          isRecorded={this.state.isRecorded}
          sended={this.state.sended}
          src={this.state.blobURL}
          response={this.state.response}
          responseIsReady={this.state.responseIsReady}

          rewrite={this.rewrite}
          sendSong={this.sendSong}
          incorrectAnswer={this.incorrectAnswer}
          correctAnswer={this.correctAnswer} />
        <AttemptsNumber attempts={this.props.attempts} />
      </div>
    );
  }
}

export default Recorder;
