import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../../styles/RecorderStyle/Record.css';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { Component } from 'react';
import Submit from '../../styles/Pictures/submit.svg';
import Rewrite from '../../styles/Pictures/rewrite.svg';

import Answer from './../processAnswerPage/Answer'
import UserAnswerBtns from './../processAnswerPage/Submit'

const useStyles = makeStyles({
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
  stopR: {
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
    background: 'red',
  },
  skel: {
    width: 300,
    background: 'red',
  },
});


export default function MsgAndAnswer(props) {
  const classes = useStyles();
  const isRecorded = props.isRecorded;
  if (isRecorded) {
    if(props.sended){
      return(
        <div>
          <Answer/>
          <UserAnswerBtns incorrectAnswer={props.incorrectAnswer} correctAnswer={props.correctAnswer}/>
        </div>
      )
    }
    return <div>
      <Skeleton className={classes.skel} animation={false} />
      <Button className={classes.startR} onClick={props.rewrite}>rewrite recording<img src={Rewrite} width={36} height={36} /></Button>
      <div className='AudioBlock'>
        <audio src={props.src} controls="controls" className='AudioControls'/>
      </div>
      <Button className={classes.startR} onClick={props.sendSong}>submit recording<img src={Submit} width={36} height={36} /></Button>
      <Skeleton className={classes.skel} animation={false} />
    </div>
  }
  return <div />
}