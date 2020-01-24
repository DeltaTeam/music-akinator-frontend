import React, { Component } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import '../../styles/RecorderStyle/Record.css';
import ListenRecord from './ListenRecord';
import CreateRecord from './CreateRecord';
import '../../styles/GamesStyles/Game.css';
import auddIO from '../../requests/audd';


const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Recorder extends Component {
  audd = new auddIO();
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
      isRecorded: false,
      text: '',

      attemptsLeft: 5,
      hasWon: false,
      hasLost: false,
      sended: false
      response: ''
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

  handleResponse = (response) => {
    //const resault = props.resault,
    const res = response;
    this.setState({
      response: res,
    }, () => {
      console.log(this.state.response)
    });
    ;
  }

  stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {

        const blobURL = URL.createObjectURL(blob);
        this.setState({ blobURL, isRecording: false });
      })
      .catch((e) => console.log(e));
    this.setState({ isRecorded: true });

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
    })
    //Когда будет запрос на сайт, его нужно сюда писать и здесь же проводить анализ угадал сайт или не угадал. Если угадал, то делаем hasWon - тру
  }
  sendedReset = () => {
    this.setState({
      sended: false
    })
  }
  incorrectAnswer = () => {
    this.props.attemptsDecrease();
    this.sendedReset();
    if (this.props.attempts - 1 == 0) {
      this.props.attemptsResert();
      this.props.incorrect();
    }
  }
  correctAnswer = () => {
    this.props.attemptsResert();
    this.props.correct();
  }

  handleSubmit = () => {
    const attempts = this.props.attempts;
    //Когда будет запрос на сайт, его нужно сюда писать и здесь же проводить анализ угадал сайт или не угадал. Если угадал, то делаем hasWon - тру
    // console.log(this.audd.sendTest())
    // console.log(this.state.blobURL);
    this.audd.sendTest(this.handleResponse)
    if (!this.state.hasWon) {
      this.props.attemptsDecrease();
      if (attempts - 1 === 0) {
        this.props.attemptsResert();
        this.props.endGame(this.state.hasWon);
      }
      else {
        this.setState({
          isRecording: false,
          blobURL: '',
          isBlocked: false,
          isRecorded: false,
        })
      }
    } else {
      this.props.endGame(this.state.hasWon);
    }

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

          rewrite={this.rewrite}
          handleSubmit={this.handleSubmit}
          sendSong={this.sendSong}
          incorrectAnswer={this.incorrectAnswer}
          correctAnswer={this.correctAnswer} />
        <AttemptsNumber attempts={this.props.attempts} />
      </div>
    );
  }
}

const AttemptsNumber = props => (
  <div className='textAttempts'>
    you have {`${props.attempts}`} attempts left
  </div>
)

export default Recorder;
