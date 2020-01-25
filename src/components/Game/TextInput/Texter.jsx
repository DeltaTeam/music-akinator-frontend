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
            text: '',

            sended: false,
            response: '',
            responseIsReady: false
        }
    }
    getSongInfo() {
        return this.state.response;
    }

    handleResponse = (responseAudd) => {
        this.setState({
            response: responseAudd, responseIsReady: true
        }, () => {
        });
    }
    sendText = () => {
        if (this.getText().length !== 0) {
            this.setState({
                sended: true
            })
            this.audd.sendLyrics(this.handleResponse, this.getText());
        }
    }
    sendedReset = () => {
        this.setState({
            sended: false,
            responseIsReady: false
        })
    }
    getText = () => {
        let newText = document.getElementsByClassName("textInputBlock")[0].value;
        return newText;
    }
    songConvert = (el) => {
        let res;
        if (JSON.parse(el.result[0].media).length === 0) {
            res = {
                artist: el.result[0].artist,
                title: el.result[0].title,
                song: null
            }
        } else {
            res = {
                artist: el.result[0].artist,
                title: el.result[0].title,
                song: JSON.parse(el.result[0].media)[0].url
            }
        }
        return res;
    }
    incorrectAnswer = () => {
        let listItem = this.songConvert(JSON.parse(this.state.response));
        console.log(listItem)
        this.props.addSongInList(listItem);
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
    undefinedAnswer = () => {
        this.props.attemptsDecrease();
        this.sendedReset();
        if (this.props.attempts - 1 === 0) {
            this.props.attemptsReset();
            this.props.incorrect();
        }
    }

    render() {
        return (
            <div className='Texter'>
                <ListenText
                    sended={this.state.sended}
                    sendText={this.sendText}
                    response={this.state.response}
                    responseIsReady={this.state.responseIsReady}

                    incorrectAnswer={this.incorrectAnswer}
                    correctAnswer={this.correctAnswer}
                    undefinedAnswer={this.undefinedAnswer} />
                <AttemptsNumber attempts={this.props.attempts}></AttemptsNumber>
            </div>
        );
    }
}

export default Texter;


