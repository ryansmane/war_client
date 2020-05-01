import React, { useEffect, useState } from 'react';
import WarStage from './WarStage';

function Room(props) {
   let socket = props.socket;
   const [host, setHost] = useState();
   const [players, setPlayers] = useState();
   const [initFlag, setInitFlag] = useState(false);
   const [readyPlayers, setReadyPlayers] = useState();

   useEffect(() => {
      setHost(props.routerProps.location.pathname.substring(10));

      socket.on('return-all-players', (players) => {
         setPlayers(players);
      });

      socket.on('one-ready', (data) => {
         setReadyPlayers(data.players);

         if (Object.values(data.players).length === data.roomCap) {
            console.log('refresh')
            socket.emit('refresh-cards', props.routerProps.location.pathname.substring(10));
         }
      });
   }, []);

   function initMyself() {
      setInitFlag(true);
      socket.emit('init-one-player', host);
   }

   function shoot() {
      socket.emit('ready-up', host);
   }

   function getPath(pip, suit) {
      let map = {
         11: 'J',
         12: 'Q',
         13: 'K',
         14: 'A',
      };

      let fileName =
         pip < 11
            ? '/images/card_sprites/' + pip.toString() + suit + '.png'
            : '/images/card_sprites/' + map[pip] + suit + '.png';
      return fileName;
   }

   return (
      <>
         {host && !players && !initFlag && (
            <>
               <h1>{host}</h1>
               <button onClick={() => initMyself()}>Ready</button>
            </>
         )}
         {host && !players && initFlag && (
            <h1>Waiting for other players to ready up...</h1>
         )}
         {host && players && initFlag && (
            <>
               <div className='enemy-side'>
                  {players.map((player) => {
                     if (player.id !== socket.id) {
                        return (
                           <>
                              <div className='enemy-unit'>
                                 <p>{player.id}</p>
                                 <img
                                    className='enemy-backs'
                                    src='/images/card_back_war.png'
                                    alt='enemy back'
                                 ></img>
                              </div>
                              <div className='enemystaging'>
                                 {readyPlayers && readyPlayers[player.id] && (
                                    <>
                                       <img
                                          src={getPath(
                                             readyPlayers[player.id].card.pip,
                                             readyPlayers[player.id].card.suit
                                          )}
                                          alt={`${
                                             readyPlayers[player.id].card.pip
                                          }${
                                             readyPlayers[player.id].card.suit
                                          }`}
                                       ></img>
                                       <p>
                                          {readyPlayers[player.id].stack} / 52
                                       </p>
                                    </>
                                 )}
                              </div>
                           </>
                        );
                     }
                  })}
               </div>
               <div className='battlefield'>
                  <div className='enemy-cards'></div>
                  <div className='enemy-cards'></div>
               </div>
               <div className='my-side'>
                  <div className='mystaging'>
                     {readyPlayers && readyPlayers[socket.id] && (
                        <>
                           <img
                              src={getPath(
                                 readyPlayers[socket.id].card.pip,
                                 readyPlayers[socket.id].card.suit
                              )}
                              alt={`${readyPlayers[socket.id].card.pip}${
                                 readyPlayers[socket.id].card.suit
                              }`}
                           ></img>
                           <p>{readyPlayers[socket.id].stack} / 52</p>
                        </>
                     )}
                  </div>
                  <h2>{socket.id}</h2>
                  <button onClick={() => shoot()}>Shoot</button>
               </div>
            </>
         )}
      </>
   );
}

export default Room;
