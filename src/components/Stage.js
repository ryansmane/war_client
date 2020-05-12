import React from 'react';
const { getPath } = require('../util/pathingService');
const _ = require('lodash');

function Stage(props) {
   return (
      <>
         {!props.lost && (
            <>
               {props.readyPlayers && props.readyPlayers[props.id] && (
                  <img
                     className='card'
                     src={getPath(
                        props.readyPlayers[props.id].card.pip,
                        props.readyPlayers[props.id].card.suit
                     )}
                     alt={`${props.readyPlayers[props.id].card.pip}${
                        props.readyPlayers[props.id].card.suit
                     }`}
                  ></img>
               )}
               {props.readyPlayers &&
                  !props.readyPlayers[props.id] &&
                  props.winner !== props.id && (
                     <img
                        className='card'
                        src='../images/empty_card.png'
                        alt='slot'
                     ></img>
                  )}
               {!props.readyPlayers && (
                  <img
                     className='card'
                     src='../images/empty_card.png'
                     alt='slot'
                  ></img>
               )}
               {props.readyPlayers &&
                  !props.readyPlayers[props.id] &&
                  props.winner === props.id && (
                     <img
                        className='card'
                        src='../images/winner_card.png'
                        alt='slot'
                     ></img>
                  )}
            </>
         )}
         {props.lost && (
            <>
               <img
                  className='card'
                  src='../images/cross_out.png'
                  alt='loser'
               ></img>
            </>
         )}
      </>
   );
}

export default Stage;
