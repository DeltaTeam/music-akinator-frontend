import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../../styles/RecorderStyle/Record.css';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import Mic from '../../styles/Pictures/mic.svg';
import Stop from '../../styles/Pictures/stop.svg';

const useStyles = makeStyles({
  root: {

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


export default function CreateRecord(props) {
  const classes = useStyles();
  const isRecorded = props.isRecorded;
  const isRecording = props.isRecording;
  if (!isRecorded) {
    if (!isRecording) {
      return <div>
        <Skeleton className={classes.skel} animation={false} />
        <Button className={classes.startR} onClick={props.start}>Start Recording <img src={Mic} width={36} height={36} /></Button>
        <Skeleton className={classes.skel} animation={false} />
      </div>

    }
    return <div>
      <Skeleton className={classes.skel} />
      <Button className={classes.stopR} onClick={props.stop}>Stop Recording <img src={Stop} width={36} height={36} /></Button>
      <Skeleton className={classes.skel} />
    </div>
  }
  return <div />
}