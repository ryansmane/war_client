import React, { useEffect, useState } from 'react';



function Room(props) {
   let socket = props.socket;
   const [startingDeck, setStartingDeck] = useState();

   useEffect(() => {
      socket.on('new-deck', deck => {
         setStartingDeck(deck);
      })
   })

   return (
      <div>
         <h1>Room</h1>
         {!startingDeck && <h1>Receiving Deck...</h1>}
         {startingDeck && <h1>Deck Received</h1>}
      </div>
   );
}

export default Room;
