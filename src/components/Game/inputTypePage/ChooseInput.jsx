import React from 'react';


export default function ChooseInput(props) {
    if (props.inputTypeChosen != 0 && props.hasWon === 0) {
        return (
            <div>
                <h3 className='textBlock greyColor'>Attempt {6 - props.round}</h3>
            </div>
        )
    }
    return <div />
}