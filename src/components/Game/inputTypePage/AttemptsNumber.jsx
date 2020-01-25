import React from 'react';

const AttemptsNumber = props => (
    <div className='textAttempts'>
        {`${props.attempts}`} attempts left
    </div>
)

export default AttemptsNumber;