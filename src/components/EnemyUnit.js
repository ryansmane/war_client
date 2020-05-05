import React from 'react';

function EnemyUnit(props) {
    console.log(props.winner, props.id);
    return (
        <div className='enemy-unit'>
            <p>{props.id}</p>
            {!props.deactivationMap[props.id] && <img
                style={props.winner === props.id
                    ? { border: '5px solid green' }
                    : { border: 'none' }}
                className='enemy-backs'
                src='/images/card_back_war.png'
                alt='enemy back'
            ></img>}
            {props.deactivationMap[props.id] && <img
                style={{opacity: '.5'}}
                className='enemy-backs'
                src='/images/lost_card_back_war.png'
                alt='enemy back'
            ></img>}
        </div>
    )
}

export default EnemyUnit;