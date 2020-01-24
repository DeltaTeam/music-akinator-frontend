import React from 'react';

export default function Score(props) {
    if (props.gameEnded) {
        return (
            <div className='scoreBlock greyColor'>
                <h2>Games Score</h2>
                <p>You&emsp;{`${props.strick}`}&emsp;:&emsp;{`${props.games}` - `${props.strick}`}&emsp;AI</p>
            </div>
        )
    }
    else
        return <div />;
}