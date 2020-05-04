import React, { useEffect, useState } from 'react';
import WarStage from './WarStage';
const _ = require('lodash');

function Room(props) {
   let socket = props.socket;
   const [host, setHost] = useState();
   const [players, setPlayers] = useState();
   const [initFlag, setInitFlag] = useState(false);
   const [readyPlayers, setReadyPlayers] = useState();
   const [warState, setWarState] = useState(false);
   const [warringPlayers, setWarringPlayers] = useState();
   const [deckLengths, setDeckLengths] = useState();
   const [winner, setWinner] = useState(false);

   useEffect(() => {
      setHost(props.routerProps.location.pathname.substring(10));

      socket.on('return-all-players', (data) => {
         setPlayers(data.players);
         setDeckLengths(data.deckLengths);
      });

      socket.on('one-ready', (data) => {
         setReadyPlayers(data.players);
         setDeckLengths(data.deckLengths);
         if (data.winner) {
            setWinner(data.winner);
         } else {
            setWinner(false);
         }
         if (Object.values(data.players).length === data.roomCap  && !data.war) {
            setTimeout(() => {
            socket.emit('refresh-cards', props.routerProps.location.pathname.substring(10));
            }, 1500);
         }
      });

      socket.on('resolved', data => {
         setWarState(false);
         setReadyPlayers(data.warHistory);
         setWarringPlayers({});
         setTimeout(() => {
         setDeckLengths(data.deckLengths);
         setReadyPlayers(data.players);
         
         }, 1500);
      })

      socket.on('war', players => {
         setWarState(true)
         setWarringPlayers(players);
      })

   }, []);

   function initMyself() {
      setInitFlag(true);
      socket.emit('init-one-player', host);
   }

   function shoot() {
      socket.emit('ready-up', host);
   }

   function resolveWar() {
      socket.emit('need-resolution', {host, warringPlayers});
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
                                 <p>
                                    {deckLengths &&
                                       `${deckLengths[player.id]}/ 52`}
                                 </p>
                                 {readyPlayers && readyPlayers[player.id] && (
                                    <>
                                       <img
                                          className='card'
                                          style={
                                             warState &&
                                             warringPlayers &&
                                             !_.isEmpty(warringPlayers) &&
                                             warringPlayers[player.id]
                                                ? { border: '5px solid red' }
                                                : winner && winner === player.id
                                                ? { border: '5px solid green' }
                                                : { border: 'none' }
                                          }
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
                              className='card'
                              style={
                                 warState &&
                                 warringPlayers &&
                                 !_.isEmpty(warringPlayers) &&
                                 warringPlayers[socket.id] 
                                    ? { border: '5px solid red' }
                                    : winner && winner === socket.id
                                    ? { border: '5px solid green' }
                                    : { border: 'none' }
                              }
                              src={getPath(
                                 readyPlayers[socket.id].card.pip,
                                 readyPlayers[socket.id].card.suit
                              )}
                              alt={`${readyPlayers[socket.id].card.pip}${
                                 readyPlayers[socket.id].card.suit
                              }`}
                           ></img>
                        </>
                     )}
                  </div>
                  <p>{deckLengths && `${deckLengths[socket.id]} / 52`}</p>
                  <h2>{socket.id}</h2>
                  {!warState && (
                     <button onClick={() => shoot()}>Deploy!</button>
                  )}
                  {warState && warringPlayers && warringPlayers[socket.id] && !readyPlayers[socket.id].changed && (
                     <button onClick={() => resolveWar()}>Fight!</button>
                  )}
               </div>
            </>
         )}
      </>
   );
}

export default Room;
