import React, { Component } from 'react';
import Recorder from '../Recorder/Recorder';
import 'typeface-roboto';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Header from './mainPage/Header';
import Score from './mainPage/Score';
import ClearScore from './mainPage/ClearScore';
import ShowRecorder from './mainPage/ShowRecorder';
import ChooseInput from './inputTypePage/ChooseInput';

const useStyles = makeStyles({
    root: {

    },
    skel: {
        width: 300,
        background: 'red',
    },
    startR: {
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
});

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userStrick: 0,
            userGames: 1,
            gameEnded: true,
            hasWon: 0,
            inputTypeChosen: 0,
            attempts: 5
        }
    }

    allSettingsReset = () =>{
        this.setState({
            gameEnded: true,
            inputTypeChosen: 0,
            attempts: 5,
            hasWon: 0
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
        let newUserGames=this.state.userGames + 1;
        this.setState({
            hasWon: -1,
            userGames: newUserGames
        })
    }
    incorrect = () => {
        let newUserGames=this.state.userGames + 1;
        let newUserStrick=this.state.userStrick + 1;
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
                    hasWon={this.state.hasWon}/>
                <ShowRecorder
                    gameEnded={this.state.gameEnded}
                    inputTypeChosen={this.state.inputTypeChosen}
                    audioChosen={this.audioChosen}
                    textChosen={this.textChosen} 
                    attempts={this.state.attempts}
                    hasWon={this.state.hasWon}

                    startGame={this.startGame}
                    endGame={this.endGame}
                    attemptsDecrease={this.attemptsDecrease}
                    attemptsReset={this.attemptsReset}
                    correct={this.correct}
                    incorrect={this.incorrect}
                    wonReset={this.wonReset}
                    allSettingsReset={this.allSettingsReset}
                    />
            </div>
        );
    }
}





function GameResault(props) {
    const classes = useStyles();
    const hasWon = props.hasWon;
    if (hasWon) {
        return <div>
            <Skeleton className={classes.skel} animation={false} />
            <div className='textBlock greenColor'>
                You win!
            </div>
            <Skeleton className={classes.skel} animation={false} />
        </div>

    }
    return <div>
        <Skeleton className={classes.skel} animation={false} />
        <div className='textBlock redColor'>
            You loose!
        </div>
        <Skeleton className={classes.skel} animation={false} />
    </div>
}

export default Game;
