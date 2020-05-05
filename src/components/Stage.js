import React from 'react';
const { getPath } = require('../util/pathingService');
const _ = require('lodash');

function Stage(props) {
   console.log(props.warringPlayers, props.warState, props.id)
   return (
      <>
         <img
            className='card'
            style={props.warState &&
               !_.isEmpty(props.warringPlayers) &&
               props.warringPlayers[props.id]
                  ? { border: '5px solid red' }
                  : { border: 'none' }
            }
            src={getPath(props.pip, props.suit)}
            alt={`${props.pip}${props.suit}`}
         ></img>
      </>
   );
}

export default Stage;
