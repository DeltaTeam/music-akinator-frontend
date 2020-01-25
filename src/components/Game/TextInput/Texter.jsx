import React, { Component } from 'react';

import ListenText from './ListenText';
import AttemptsNumber from './../inputTypePage/AttemptsNumber'



class Texter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRecording: false,
            isBlocked: false,
            isRecorded: false,
            text: '',

            sended: false,
            response: ''
        }
    }
    sendText = () => {
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


