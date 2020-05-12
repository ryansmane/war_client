import React from 'react';
const _ = require('lodash');

function EnemyUnit(props) {
   return (
      <div className='enemy-unit'>
         {props.warState &&
            !_.isEmpty(props.warringPlayers) &&
            props.warringPlayers[props.id] && (
               <div className='enemy-info-at-war'>
                  {props.winner === props.id && (
                     <img
                        className='crown'
                        src='../images/crown.png'
                        alt='winner'
                     ></img>
                  )}
                  <div className='name-and-count'>
                     <span>{props.name}</span>
                     {props.warState &&
                        !_.isEmpty(props.warringPlayers) &&
                        props.warringPlayers[props.id] &&
                        Object.values(props.warringPlayers).map((p) => {
                           return (
                              <img
                                 className='sword'
                                 src='../images/war_sword.png'
                                 alt='sword'
                              ></img>
                           );
                        })}
                     <span>{`${props.deckLength}/52`}</span>
                  </div>
               </div>
            )}
         {!props.warState && !props.warringPlayers[props.id] && (
            <div>
               {/* {props.warState &&
                   !_.isEmpty(props.warringPlayers) &&
                   props.warringPlayers[props.id] &&
                   Object.values(props.warringPlayers).map((p) => {
                      return (
                         <img
                            className='sword'
                            src='../images/war_sword.png'
                            alt='sword'
                         ></img>
                      );
                   })} */}
               <div className='name-and-count'>
                  <span>{props.name}</span>
                  {props.warState &&
                     !_.isEmpty(props.warringPlayers) &&
                     props.warringPlayers[props.id] &&
                     Object.values(props.warringPlayers).map((p) => {
                        return (
                           <img
                              className='sword'
                              src='../images/war_sword.png'
                              alt='sword'
                           ></img>
                        );
                     })}
                  <span>{`${props.deckLength}/52`}</span>
               </div>
            </div>
         )}
         {!props.deactivationMap[props.id] && (
            <img
               className='card'
               src='../images/cardbackwar.png'
               alt='enemy back'
            ></img>
         )}
         {props.deactivationMap[props.id] && (
            <img
               style={{ opacity: '.5' }}
               className='card'
               src='../images/lost_cardbackwar.png'
               alt='enemy back'
            ></img>
         )}
      </div>
   );
}

export default EnemyUnit;
