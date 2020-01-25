import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Recorder from '../../Recorder/Recorder';
import InputTypeButtons from '../inputTypePage/InputTypeButtons'
import Texter from '../TextInput/Texter'
import GoToMainMenu from '../endGame/GoToMainMenu'
import SongsList from '../../processAnswerPage/SongsList'

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

    if (gameEnded) {
        return (
            <div>
                <Button
                    className={classes.startR}
                    onClick={props.startGame}> Start Game </Button>
            </div>)
    }
    else {
        if (props.hasWon === 0) {
            if (inputTypeChosen === 0) {
                return (
                    <InputTypeButtons
                        textChosen={props.textChosen}
                        audioChosen={props.audioChosen} />
                )
            }
            if (inputTypeChosen === 1) {
                return (
                    <div>
                        <Recorder
                            attempts={props.attempts}
                            hasWon={props.hasWon}
                            sended={props.sended}

                            endGame={props.endGame}
                            attemptsDecrease={props.attemptsDecrease}
                            attemptsReset={props.attemptsReset}
                            correct={props.correct}
                            incorrect={props.incorrect}
                            wonReset={props.wonReset}
                            addSongInList={props.addSongInList} />
                    </div>
                )
            }
            if (inputTypeChosen === -1) {
                return (
                    <Texter
                        attempts={props.attempts}
                        hasWon={props.hasWon}
                        sended={props.sended}

                        endGame={props.endGame}
                        attemptsDecrease={props.attemptsDecrease}
                        attemptsReset={props.attemptsReset}
                        correct={props.correct}
                        incorrect={props.incorrect}
                        wonReset={props.wonReset} />
                )
            }
        }
        else {
            if (props.hasWon === 1) {
                return (
                    <div>
                        <p className='centeredStandartTextBlock greyColor'>AI dasn`t know your song.</p>
                        <p className='centeredStandartTextBlock greyColor'>You won ... this time.</p>
                        <SongsList songs={props.songs}></SongsList>
                        <GoToMainMenu allSettingsReset={props.allSettingsReset} />
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <p className='centeredStandartTextBlock greyColor'>Ha ha ha. It`s so easy for AI.</p>
                        <p className='centeredStandartTextBlock greyColor'>You Loose.</p>
                        <SongsList songs={props.songs}></SongsList>
                        <GoToMainMenu allSettingsReset={props.allSettingsReset} />
                    </div>
                )
            }
        }
    }
}