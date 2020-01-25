import React, { Component } from 'react';

import ListenText from './ListenText';
import AttemptsNumber from './../inputTypePage/AttemptsNumber'
import auddIO from '../../../requests/audd';



class Texter extends Component {
    audd = new auddIO();
    constructor(props) {
        super(props);
        this.state = {
            isRecording: false,
            isBlocked: false,
            isRecorded: false,
            text: 'hello it`s me',
            sended: false,
            response: ''
        }
    }
    getSongInfo() {
        return this.state.response;
    }

    handleResponse = (responseAudd) => {
        this.setState({
            response: responseAudd,
        }, () => {
            console.log(this.state.response);
        });
    }
    sendText = () => {
        this.setState({
            sended: true
        })
        console.log("sendText");
        console.log(document.getElementsByClassName("textInputBlock")[0]);
        //Когда будет запрос на сайт, его нужно сюда писать и здесь же проводить анализ угадал сайт или не угадал. Если угадал, то делаем hasWon - тру
        this.audd.sendLyrics(this.handleResponse, this.state.text);
    }
    sendedReset = () => {
        this.setState({
            sended: false
        })
    }
    incorrectAnswer = () => {
        this.props.attemptsDecrease();
        this.sendedReset();
        if (this.props.attempts - 1 === 0) {
            this.props.attemptsReset();
            this.props.incorrect();
        }
    }
    correctAnswer = () => {
        this.props.attemptsReset();
        this.props.correct();
    }

    render() {
        return (
            <div className='Texter'>
                <ListenText
                    sended={this.state.sended}
                    sendText={this.sendText}
                    incorrectAnswer={this.incorrectAnswer}
                    correctAnswer={this.correctAnswer} />
                <AttemptsNumber attempts={this.props.attempts}></AttemptsNumber>
            </div>
        );
    }
}

export default Texter;


