import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Submit from '../../../styles/Pictures/submit.svg';

import TextBlock from './TextBlock';
import Answer from './../../processAnswerPage/Answer';
import NullAnswer from './../../processAnswerPage/NullAnswer';
import UserAnswerBtns from './../../processAnswerPage/Submit';
import Continue from './../../processAnswerPage/Continue'

const useStyles = makeStyles({
    startR: {
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        padding: '0 30px',
        width: '300px',
        height: '36px',
        marginLeft: 'calc(50% - 300px/2 + 0.5px)',
        marginTop: '5px',
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
    }
});

export default function SubmitText(props) {
    const classes = useStyles();
    if (!props.sended) {
        return (
            <div className='TextInput'>
                <TextBlock />
                <Button className={classes.startR} onClick={props.sendText}>submit text<img src={Submit} width={36} height={36} /></Button>
            </div>
        );
    }
    else {
        if (props.responseIsReady) {
            let response = JSON.parse(props.response)
            if (response.result.length === 0) {
                <div>
                    <NullAnswer />
                    <Continue incorrectAnswer={props.undefinedAnswer} />
                </div>
            }
            else {
                let response = JSON.parse(props.response);
                return (
                    <div>
                        <Answer
                            artist={response.result[0].artist}
                            title={response.result[0].title}
                            song={''}
                        />
                        <UserAnswerBtns
                            incorrectAnswer={props.incorrectAnswer}
                            correctAnswer={props.correctAnswer} />
                    </div>
                )
            }
        }
        else {
            return (
                <p>Loading...</p>
            );
        }
    }
    return (
        <div>
            <NullAnswer />
            <Continue incorrectAnswer={props.undefinedAnswer} />
        </div>
    );
}