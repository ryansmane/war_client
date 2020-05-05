import React from 'react';
const _ = require('lodash');

function ActionSelect(props) {
   return (
      <>
         {!props.warState && !props.acted && (
            <button
               style={
                  props.winner === props.id
                     ? { border: '5px solid green' }
                     : { border: 'none' }
               }
               onClick={() => props.shoot()}
            >
               Deploy!
            </button>
         )}
         {props.warState &&
            props.warringPlayers &&
            props.warringPlayers[props.id] &&
            !props.acted && (
               <button onClick={() => props.resolveWar()}>Fight!</button>
            )}
      </>
   );
}

export default ActionSelect;
