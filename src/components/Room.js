import React, { useEffect, useState } from 'react';
import cardBack from '../imgs/card_back_war.png';
import redLight from '../imgs/off_button_war.png';
import greenLight from '../imgs/on_button_war.png';
import { generatePath } from 'react-router';

function Room(props) {
   let socket = props.socket;
   const [myDeck, setMyDeck] = useState();
   const [otherPlayers, setOtherPlayers] = useState();
   const [roomName, setRoomName] = useState();
   const [lightBeam, setLightBeam] = useState(false);
   const [falseFlag, setFalseFlag] = useState(false);
   const [battling, setBattling] = useState(false);

   useEffect(() => {
      socket.on('get-all-players', (room) => {
         let players = room.players;
         let myPlayer = players.filter((p) => p.id === socket.id);
         let otherPlayers = players.filter((p) => p.id !== socket.id);
         setRoomName(room.name);
         setMyDeck(myPlayer[0].deck);
         setOtherPlayers(otherPlayers);
        
      });

      socket.on('return-after-click', (data) => {
         let myPlayer = data.players.filter((p) => p.id === socket.id);
         let otherPlayers = data.players.filter((p) => p.id !== socket.id);
         if (data.all) {
            setBattling(true);
            setFalseFlag(true);
            setTimeout(() => {
               setMyDeck(myPlayer[0].deck);
               setOtherPlayers(otherPlayers);
               setFalseFlag(false);
               setLightBeam(false);
               setBattling(false);
            }, 2000)
            
         } else {
         setMyDeck(myPlayer[0].deck);
         setOtherPlayers(otherPlayers);
         }
      });
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

   return (
      <div>
         {!myDeck && !otherPlayers && <h1>Receiving Deck...</h1>}
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

                              <div className='flex-back'>
                                 <img
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
                        <img
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
         )}
      </div>
   );
}

export default Room;
