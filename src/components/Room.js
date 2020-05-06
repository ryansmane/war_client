import React, { useEffect, useState } from 'react';
import EnemyUnit from './EnemyUnit';
import Stage from './Stage'
import ActionSelect from './ActionSelect'
import InitPage from './InitPage'

const _ = require('lodash');

function Room(props) {
   let socket = props.socket;
   const [host, setHost] = useState();
   const [players, setPlayers] = useState();
   const [initFlag, setInitFlag] = useState(false);
   const [readyPlayers, setReadyPlayers] = useState();
   const [warState, setWarState] = useState(false);
   const [warringPlayers, setWarringPlayers] = useState({});
   const [deckLengths, setDeckLengths] = useState();
   const [winner, setWinner] = useState(false);
   const [deactivationMap, setDeactivationMap] = useState({});
   const [ultimateWinner, setUltimateWinner] = useState(false);

   useEffect(() => {
      setHost(props.routerProps.location.pathname.substring(10));

      socket.on('return-all-players', (data) => {
         setPlayers(data.players);
         setDeckLengths(data.deckLengths);
      });

      socket.on('one-ready', (data) => {
         setReadyPlayers(data.players);
         setDeckLengths(data.deckLengths);
         if (Object.values(data.players).length === data.roomCap && !data.war) {
            setTimeout(() => {
               socket.emit('refresh-cards', props.routerProps.location.pathname.substring(10));
               }, 1500);
         }
      });

      socket.on('resolved', data => {
         if (data.deactivationMap) {
            setDeactivationMap(data.deactivationMap);
         }

         if (data.ultimateWinner) {
            setUltimateWinner(data.winner)
         }

         if (data.warHistory) {
         setWarState(false);
         setReadyPlayers(data.warHistory);
         setWarringPlayers({});
         setTimeout(() => {
         setWinner(data.winner);
         setDeckLengths(data.deckLengths);
         setReadyPlayers(data.players);
         
         }, 1500);
         } else {
            setWarState(false);
            setReadyPlayers(data.players);
            setWinner(data.winner)
            setDeckLengths(data.deckLengths);
         }
      })

      socket.on('war', data => {
         if (data.deactivationMap) {
            setDeactivationMap(data.deactivationMap)
         }
         setWinner(false);
         setDeckLengths(data.deckLengths);
         setReadyPlayers(data.players);
         setWarringPlayers(data.warPlayers);
         setWarState(true);
         
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
      socket.emit('need-resolution', { host, warringPlayers });
   }

   return (
      <>
         {host && !players && !initFlag &&
            <InitPage host={host} initMyself={initMyself} />
         }
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
                           <EnemyUnit id={player.id} deactivationMap={deactivationMap} winner={winner}/>
                              
                              <div className='enemystaging'>
                                 <p>
                                    {deckLengths &&
                                       `${deckLengths[player.id]}/ 52`}
                                 </p>
                                 {readyPlayers && readyPlayers[player.id] &&
                                    <Stage warState={warState} warringPlayers={warringPlayers} pip={readyPlayers[player.id].card.pip} suit={readyPlayers[player.id].card.suit} id={player.id} />
                                 }
                              </div>
                           </>
                        );
                     }
                  })}
               </div>
               {!deactivationMap[socket.id] && <div className='my-side'>
                  <div className='mystaging'>
                     {readyPlayers && readyPlayers[socket.id] && (
                        <Stage warState={warState} warringPlayers={warringPlayers} pip={readyPlayers[socket.id].card.pip} suit={readyPlayers[socket.id].card.suit} id={socket.id} />
                     )}
                  </div>
                  <p>{deckLengths && `${deckLengths[socket.id]} / 52`}</p>
                  <h2>{socket.id}</h2>
                  <ActionSelect warState={warState} shoot={shoot} resolveWar={resolveWar} winner={winner} warringPlayers={warringPlayers} id={socket.id} acted={readyPlayers && readyPlayers[socket.id] ? readyPlayers[socket.id].changed : null} />
               </div>}

               {deactivationMap[socket.id] && <div className='losing-screen'>
                  <h1>YOU LOSE</h1>
               </div>}
               {ultimateWinner === socket.id && <div className='winning-screen'>
                  <h1>YOU WIN</h1>
               </div>}
            </>
         )}
      </>
   );
}

export default Room;
