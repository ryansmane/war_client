import React, { useEffect, useState } from 'react';
import cardBack from '../imgs/card_back_war.png';
import redLight from '../imgs/off_button_war.png';
import greenLight from '../imgs/on_button_war.png';
import { generatePath } from 'react-router';

function Room(props) {
   let socket = props.socket;
   const [host, setHost] = useState();
   const [allReadyFlag, setAllReadyFlag] = useState(false);
   const [personalReadyFlag, setPersonalReadyFlag] = useState(false);

   useEffect(() => {
      setHost(props.routerProps.location.pathname.substring(10));

      socket.on('all-ready', room => {
         setAllReadyFlag(true);
         console.log(room)
      } )
   });

   function getPath(pip, suit) {
      let map = {
         11: 'J',
         12: 'Q',
         13: 'K',
         14: 'A'
      } 

      let fileName = pip < 11 ? '/images/card_sprites/' + pip.toString() + suit + '.png' : 
         '/images/card_sprites/' + map[pip] + suit + '.png';
      return fileName;
   }

   function setReadyStatus(e) {
      e.preventDefault();
      setPersonalReadyFlag(true);
      socket.emit('ready-up', host);
   }

   return (
      <div>
         {!allReadyFlag && !personalReadyFlag && <button onClick={e => setReadyStatus(e)}>Ready</button>}
         {!allReadyFlag && personalReadyFlag &&
            <h1>Waiting for other players to ready up...</h1>
         }
         {allReadyFlag && (
            <h1>AllReady</h1>
         )}

         
         {/* {!myDeck && !otherPlayers && <h1>Receiving Deck...</h1>}
         {myDeck && otherPlayers && (
            <>
               <div className='enemy-side'>
                  {otherPlayers.map((player) => {
                     return (
                        <>
                           <div className='my-flex'>
                              <div className='flex-name'>
                                 <div className='h'>
                                    <h4>{player.id}</h4>
                                 </div>
                                 <div className='flex-light'>
                                    <img
                                       className='light'
                                       src={
                                          player.clicked || falseFlag ? greenLight : redLight
                                       }
                                       alt='light-indicator'
                                    ></img>
                                 </div>
                              </div>

                              <div className='flex-back' >
                                 <img style={player.id === winningID ? { border: '10px solid green' } : { border: 'none' }}
                                    className='enemy-card-back'
                                    src={cardBack}
                                    alt='A poorly-drawn card back'
                                 ></img>
                              </div>
                           </div>
                        </>
                     );
                  })}
               </div>
               
                  <div className='battleground'>
                     <div className='enemy-cards'>
                        {otherPlayers.map(player => {
                           return (
                              <div className='enemy-card'>
                                 {!battling && <img
                                 className='staging-card'
                                    style={player.clicked ? { visibility: 'visible'} : { visibility: 'hidden'}}
                                    src={cardBack}
                                    alt='staging enemy card'
                                 ></img>}
                                 {battling && <div>
                                    <img className='staging-card' src={getPath(player.deck[0].pip, player.deck[0].suit)} alt={`${player.deck[0].pip} ${player.deck[0].suit}`}></img>
                                 </div>}

                              </div>
                           );
                        })}
                     </div>
                     <div className='my-card'>
                        
                     {!battling && <img
                        className='staging-card'
                        style={lightBeam ? { visibility: 'visible' } : { visibility: 'hidden' }}
                        src={cardBack}
                        alt='staging enemy card'
                     ></img>}
                     {battling && <div>
                        <img className='staging-card' src={getPath(myDeck[0].pip, myDeck[0].suit)} alt={`${myDeck[0].pip} ${myDeck[0].suit}`}></img>
                     </div>}
                     </div>
                  </div>
               

               <div className='my-side'>
                  <div className='my-flex'>
                     <div
                        className='flex-back'
                        onClick={() => {
                           setLightBeam(true);
                           socket.emit('clicked', {
                              name: roomName,
                              id: socket.id,
                           });
                        }}
                     >
                        <img style={socket.id === winningID ? { border: '10px solid green' } : { border: 'none' }}
                           className='my-card-back'
                           src={cardBack}
                           alt='A poorly-drawn card back'
                        ></img>
                     </div>
                     <div className='flex-name'>
                        <div className='h'>
                           <h4>{socket.id}</h4>
                        </div>
                        <div className='flex-light'>
                           <img
                              className='light'
                              src={lightBeam ? greenLight : redLight}
                              alt='light-indicator'
                           ></img>
                        </div>
                     </div>
                  </div>
               </div>
            </>
         )} */}
      </div>
   );
}

export default Room;
