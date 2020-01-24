import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

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

export default function Submit(props){
    return(
        <div>
            <Button className={classes.startR} onClick={props.clearScore}>Correct</Button>
            <Button className={classes.startR} onClick={props.clearScore}>Incorrect</Button>
        </div>
    )
}