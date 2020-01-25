import React, { Component } from 'react';
import 'typeface-roboto';

import Header from './mainPage/Header';
import Score from './mainPage/Score';
import ClearScore from './mainPage/ClearScore';
import ShowRecorder from './mainPage/ShowRecorder';
import ChooseInput from './inputTypePage/ChooseInput';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userStrick: 0,
            userGames: 0,
            gameEnded: true,
            hasWon: 0,
            inputTypeChosen: 0,
            attempts: 5,
            songs: []
        }
    }

    allSettingsReset = () => {
        this.setState({
            gameEnded: true,
            inputTypeChosen: 0,
            attempts: 5,
            hasWon: 0,
            songs: []
        })
    }
    attemptsDecrease = () => {
        let val = this.state.attempts - 1;
        this.setState({
            attempts: val
        })
    }
    attemptsReset = () => {
        this.setState({
            attempts: 5
        })
    }

    textChosen = () => {
        this.setState({
            inputTypeChosen: -1
        })
    }

    audioChosen = () => {
        this.setState({
            inputTypeChosen: 1
        })
    }

    inputChosenReset = () => {
        this.setState({
            inputTypeChosen: 0
        })
    }
    correct = () => {
        let newUserGames = this.state.userGames + 1;
        this.setState({
            hasWon: -1,
            userGames: newUserGames
        })
    }
    incorrect = () => {
        let newUserGames = this.state.userGames + 1;
        let newUserStrick = this.state.userStrick + 1;
        this.setState({
            hasWon: 1,
            userGames: newUserGames,
            userStrick: newUserStrick
        })
    }
    wonReset = () => {
        this.setState({
            hasWon: 0
        })
    }



    endGame = (resault) => {
        //const resault = props.resault,
        const Games = this.state.userGames;
        const Strick = this.state.userStrick;
        this.setState({
            gameEnded: true,
            hasWon: resault,
            userGames: Games + 1,
        })
        if (resault) {
            this.setState({
                userStrick: Strick + 1
            })
        }
        else {
            this.setState({
                userStrick: 0
            })
        }
    }

    startGame = () => {
        this.setState({
            gameEnded: false
        })
    }

    clearScore = () => {
        this.setState({
            userStrick: 0,
            userGames: 0
        })
    }

    addSongInList = (song) => {
        if (song.result !== null) {
            let newSongs = this.state.songs;
            newSongs.push(song);
            this.setState({
                songs: newSongs
            })
        }
    }

    render() {
        return (
            <div className='gameBlock'>
                <Header />
                <Score
                    strick={this.state.userStrick}
                    games={this.state.userGames}
                    gameEnded={this.state.gameEnded} />
                <ClearScore
                    gameEnded={this.state.gameEnded}
                    clearScore={this.clearScore}
                    userGames={this.state.userGames} />
                <ChooseInput
                    round={this.state.attempts}
                    inputTypeChosen={this.state.inputTypeChosen}
                    hasWon={this.state.hasWon} />
                <ShowRecorder
                    gameEnded={this.state.gameEnded}
                    inputTypeChosen={this.state.inputTypeChosen}
                    audioChosen={this.audioChosen}
                    textChosen={this.textChosen}
                    attempts={this.state.attempts}
                    hasWon={this.state.hasWon}
                    songs={this.state.songs}

                    startGame={this.startGame}
                    endGame={this.endGame}
                    attemptsDecrease={this.attemptsDecrease}
                    attemptsReset={this.attemptsReset}
                    correct={this.correct}
                    incorrect={this.incorrect}
                    wonReset={this.wonReset}
                    allSettingsReset={this.allSettingsReset}
                    addSongInList={this.addSongInList}
                />
            </div>
        );
    }
}

export default Game;
