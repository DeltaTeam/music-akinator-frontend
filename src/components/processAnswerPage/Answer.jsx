import React from 'react';

const Answer = props => (
    <div>
        <p className='standartTextBlock greyColor'>Answer:</p>
        <p className='standartTextBlock greyColor'>{props.artist} &mdash; {props.title}</p>
        <audio controls>
            <source src={props.song}></source>
        </audio>
    </div>
)

export default Answer
