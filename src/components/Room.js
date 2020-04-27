import React, { useEffect, useState } from 'react';
import cardBack from '../imgs/card_back_war.png';

function Room(props) {
   let socket = props.socket;
   const [myDeck, setMyDeck] = useState();
   const [otherPlayers, setOtherPlayers] = useState();
   const [roomName, setRoomName] = useState();

   useEffect(() => {
      socket.on('get-all-players', (room) => {
         let players = room.players;
         let myPlayer = players.filter((p) => p.id == socket.id);
         let otherPlayers = players.filter((p) => p.id !== socket.id);
         setRoomName(room.name)
         setMyDeck(myPlayer[0].deck);
         setOtherPlayers(otherPlayers);
      });

      socket.on('return-after-click', players => {
         let myPlayer = players.filter((p) => p.id == socket.id);
         let otherPlayers = players.filter((p) => p.id !== socket.id);
         setMyDeck(myPlayer[0].deck);
         setOtherPlayers(otherPlayers);
      })
   });

   return (
      <div>
         {!myDeck && !otherPlayers && <h1>Receiving Deck...</h1>}
         {myDeck && otherPlayers && (
            <>
               <div className='enemy-side'>
                  {otherPlayers.map((player) => {
                     return (
                        <>
                        <div className='enemy-deck'>
                           <h6>{player.id}</h6>
                           <img
                              className='enemy-card-back'
                              src={cardBack}
                              alt='A poorly-drawn card back'
                           ></img>
                        </div>
                        <div className='enemy-top-card'>
                           <h1>{player.deck[0].pip}{player.deck[0].suit}</h1>
                        </div>
                        </>
                     );
                  })}
               </div>
               <div className='my-side'>
                  <div className='my-deck' onClick={() => {
                     socket.emit('clicked', {
                        name: roomName, id: socket.id
                     } )
                  }}>
                     <h6>{socket.id}</h6>
                     <img
                        className='my-card-back'
                        src={cardBack}
                        alt='A poorly-drawn card back'
                     ></img>
                  </div>
                  <div className='my-top-card'>
                     <h1>{myDeck[0].pip}{myDeck[0].suit}</h1>
                  </div>
               </div>
            </>
         )}
      </div>
   );
}

export default Room;
