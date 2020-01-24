import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Recorder from '../../Recorder/Recorder';
import InputTypeButtons from '../inputTypePage/InputTypeButtons'

const useStyles = makeStyles({
    startR: {
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        padding: '0 30px',
        width: '300px',
        height: '36px',
        marginLeft: 'calc(50% - 300px/2 + 0.5px)',
        marginTop: '10px',
        top: 'calc(50% - 16px/2)',
        borderRadius: '4px',
        /* button */
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '16px',
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

export default function ShowRecorder(props) {
    const classes = useStyles();
    const gameEnded = props.gameEnded;
    const inputTypeChosen = props.inputTypeChosen

    const games = props.games;

    if (gameEnded) {
        return (
            <div>
                {/* <Skeleton className={classes.skel} animation={false} /> */}
                <Button
                    className={classes.startR}
                    onClick={props.startGame}> Start Game </Button>
                {/* <Skeleton className={classes.skel} animation={false} /> */}
            </div>)
    }
    else {
        if (inputTypeChosen == 0) {
            return (
                <InputTypeButtons 
                    textChosen={props.textChosen} 
                    audioChosen={props.audioChosen} />
            )
        }
        if (inputTypeChosen == 1) {
            return (
                <div>
                    <Recorder 
                    attempts = {props.attempts}
                    hasWon = {props.hasWon}

                    endGame={props.endGame} 
                    attemptsDecrease = {props.attemptsDecrease}
                    attemptsResert = {props.attemptsResert}
                    correct = {props.correct}
                    incorrect = {props.incorrect}
                    wonReset = {props.wonReset}/>
                </div>
            )
        }
        if (inputTypeChosen == -1) {
            return (
                <p>Text</p>
            )
        }
    }
    return (
        <p>End Game</p>
    )
}