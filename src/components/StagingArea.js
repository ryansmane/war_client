import React from 'react';

function StagingArea(props) {
    //props.data
    //props.mySocket

    return (
        <>
        {props.bool && <img className='staging-backs' src='/images/card_back_war.png' alt='staging area'></img>}
        </>
    )
}

export default StagingArea;