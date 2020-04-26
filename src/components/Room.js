import React, { useEffect, useState } from 'react';



function Room(props) {
   let socket = props.socket;
   const [myDeck, setMyDeck] = useState();
   const [otherPlayers, setOtherPlayers] = useState();

   useEffect(() => {
      socket.on('get-all-players', room => {
         let players = room.players;
         let myPlayer = players.filter(p => p.id == socket.id);
         let otherPlayers = players.filter(p => p.id !== socket.id);
         console.log(myPlayer)
         console.log(otherPlayers)
         setMyDeck(myPlayer[0].deck)
         setOtherPlayers(otherPlayers)
      })
   })

   return (
      <div>
         <h1>Room</h1>
         {(!myDeck && !otherPlayers) && <h1>Receiving Deck...</h1>}
         {(myDeck && otherPlayers) && (
         <> 
         <h1>Decks Received</h1>
         <div className='enemy-decks'>
            <h2>ENEMY</h2>
            {otherPlayers.map(player => {
               return <ul>
               {player.deck.map(card => {
                  return <li>{card.suit}{card.pip}</li>
               })}
               </ul>
            })}
         </div>
         <h2>ME</h2>
         <div className='my-deck'>
            <ul>
               {myDeck.map(card => {
                  return <li>{card.suit}{card.pip}</li>
               })}
            </ul>
         </div>
         </>
         )
         }

      </div>
   );
}

export default Room;
