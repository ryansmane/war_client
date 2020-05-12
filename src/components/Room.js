import React, { useEffect, useState } from 'react';
import EnemyUnit from './EnemyUnit';
import Stage from './Stage';
import ChatBox from './ChatBox';
import ActionSelect from './ActionSelect';
import Redirecting from './Redirecting';
import InitPage from './InitPage';
import WinnerPage from './WinnerPage';
const { Howl, Howler } = require('howler');

const _ = require('lodash');

function Room(props) {
   let socket = props.socket;
   const deal = new Howl({
      src: ['/sounds/card_deal.wav'],
      volume: 1,
   });
   const war = new Howl({
      src: ['/sounds/war_sound.wav'],
      volume: 1,
   });
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
   const [clickedOnce, setClickedOnce] = useState(false);
   const [disconnected, setDisconnected] = useState(false);

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
               socket.emit(
                  'refresh-cards',
                  props.routerProps.location.pathname.substring(10)
               );
            }, 1500);
         }
      });

      socket.on('resolved', (data) => {
         if (data.deactivationMap) {
            setDeactivationMap(data.deactivationMap);
         }

         if (data.ultimateWinner) {
            setUltimateWinner(data.winner);
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
            setWinner(data.winner);
            setDeckLengths(data.deckLengths);
         }
      });

      socket.on('war', (data) => {
         setTimeout(() => {
            if (data.deactivationMap) {
               setDeactivationMap(data.deactivationMap);
            }
            setWinner(false);
            setDeckLengths(data.deckLengths);
            setReadyPlayers(data.players);
            setWarringPlayers(data.warPlayers);
            setWarState(true);
         }, 100);
         war.play();
      });

      socket.on('disconnected', (player) => {
         setDisconnected(true);
         setTimeout(() => props.routerProps.history.push(`/`), 5000);
      });
   }, []);

   function initMyself() {
      setInitFlag(true);
      socket.emit('init-one-player', host);
   }

   function shoot() {
      deal.play();
      setClickedOnce(true);
      socket.emit('ready-up', host);
   }

   function resolveWar() {
      deal.play();
      socket.emit('need-resolution', { host, warringPlayers });
   }

   return (
      <>
         {!disconnected && (
            <div className='felt-container'>
               {host && !players && !initFlag && (
                  <InitPage host={host} initMyself={initMyself} />
               )}
               {host && !players && initFlag && (
                  <h1>Waiting for other players to ready up...</h1>
               )}
               {host && players && initFlag && !ultimateWinner && (
                  <div className='felt'>
                     <div className='enemy-side'>
                        {Object.values(players).map((player) => {
                           if (player.id !== socket.id) {
                              return (
                                 <div className='enemy-unit-container'>
                                    <div className='enemy-slot'>
                                       <EnemyUnit
                                          warringPlayers={warringPlayers}
                                          warState={warState}
                                          name={player.name}
                                          deckLength={
                                             deckLengths
                                                ? deckLengths[player.id]
                                                : null
                                          }
                                          id={player.id}
                                          deactivationMap={deactivationMap}
                                          winner={winner}
                                       />

                                       <div className='enemystaging'>
                                          <Stage
                                             lost={
                                                deactivationMap &&
                                                deactivationMap[player.id]
                                                   ? true
                                                   : false
                                             }
                                             winner={winner}
                                             warState={warState}
                                             warringPlayers={warringPlayers}
                                             id={player.id}
                                             readyPlayers={
                                                readyPlayers
                                                   ? readyPlayers
                                                   : false
                                             }
                                          />
                                       </div>
                                    </div>
                                 </div>
                              );
                           }
                        })}
                     </div>
                     <div className='felt-partition'>
                        {warState && <p className='war-statement'>WAR!</p>}
                     </div>
                     {!deactivationMap[socket.id] && (
                        <div className='side-container'>
                           <ChatBox
                              socket={socket}
                              host={props.routerProps.location.pathname.substring(
                                 10
                              )}
                              id={socket.id}
                           />
                           <div className='my-side'>
                              <div className='my-staging'>
                                 <div>
                                    <div className='f'>
                                       {warState &&
                                          !_.isEmpty(warringPlayers) &&
                                          warringPlayers[socket.id] &&
                                          Object.values(warringPlayers).map(
                                             (p) => {
                                                return (
                                                   <img
                                                      className='sword'
                                                      src='/images/war_sword.png'
                                                      alt='sword'
                                                   ></img>
                                                );
                                             }
                                          )}
                                       <span>
                                          <em>S. {players[socket.id].name}</em>
                                       </span>
                                    </div>
                                    {
                                       <ActionSelect
                                          lost={false}
                                          name={
                                             players
                                                ? players[socket.id].name
                                                : 'No Name Selected'
                                          }
                                          deckLength={
                                             deckLengths
                                                ? deckLengths[socket.id]
                                                : null
                                          }
                                          warState={warState}
                                          shoot={shoot}
                                          resolveWar={resolveWar}
                                          winner={winner}
                                          warringPlayers={warringPlayers}
                                          id={socket.id}
                                          acted={
                                             readyPlayers &&
                                             readyPlayers[socket.id]
                                                ? readyPlayers[socket.id]
                                                     .changed
                                                : null
                                          }
                                       />
                                    }
                                 </div>
                                 <div className='action-partition'></div>
                                 <div>
                                    <div
                                       style={{ visibility: 'hidden' }}
                                       className='f'
                                    >
                                       {warState &&
                                          !_.isEmpty(warringPlayers) &&
                                          warringPlayers[socket.id] &&
                                          Object.values(warringPlayers).map(
                                             (p) => {
                                                return (
                                                   <img
                                                      className='sword'
                                                      src='/images/war_sword.png'
                                                      alt='sword'
                                                   ></img>
                                                );
                                             }
                                          )}
                                       <span>{players[socket.id].name}</span>
                                    </div>
                                    <Stage
                                       lost={false}
                                       winner={winner}
                                       warState={warState}
                                       warringPlayers={warringPlayers}
                                       id={socket.id}
                                       readyPlayers={
                                          readyPlayers ? readyPlayers : false
                                       }
                                    />
                                 </div>
                              </div>
                              <p>
                                 {deckLengths &&
                                    `Card Count: ${deckLengths[socket.id]}/52`}
                              </p>
                           </div>
                        </div>
                     )}
                     {deactivationMap[socket.id] && (
                        <div className='side-container'>
                           <ChatBox
                              socket={socket}
                              host={props.routerProps.location.pathname.substring(
                                 10
                              )}
                              id={socket.id}
                           />
                           <div className='my-side'>
                              <div className='my-staging'>
                                 <div>
                                    <div className='f'>
                                       <span>
                                          <em>S. {players[socket.id].name}</em>
                                       </span>
                                    </div>
                                    <ActionSelect
                                       lost={true}
                                       name={
                                          players
                                             ? players[socket.id].name
                                             : 'No Name Selected'
                                       }
                                       deckLength={
                                          deckLengths
                                             ? deckLengths[socket.id]
                                             : null
                                       }
                                       warState={warState}
                                       shoot={shoot}
                                       resolveWar={resolveWar}
                                       winner={winner}
                                       warringPlayers={warringPlayers}
                                       id={socket.id}
                                       acted={
                                          readyPlayers &&
                                          readyPlayers[socket.id]
                                             ? readyPlayers[socket.id].changed
                                             : null
                                       }
                                    />
                                    }
                                 </div>
                                 <div className='action-partition'></div>
                                 <div>
                                    <Stage
                                       lost={true}
                                       winner={winner}
                                       warState={warState}
                                       warringPlayers={warringPlayers}
                                       id={socket.id}
                                       readyPlayers={
                                          readyPlayers ? readyPlayers : false
                                       }
                                    />
                                 </div>
                              </div>
                              <p>{deckLengths && `Card Count: 0/52`}</p>
                           </div>
                        </div>
                     )}

                     {ultimateWinner === socket.id && (
                        <div className='winning-screen'>
                           <h1>YOU WIN</h1>
                        </div>
                     )}
                  </div>
               )}
               {initFlag && <p className='instructions'>Have fun!</p>}
            </div>
         )}
         {disconnected && <Redirecting />}
         {ultimateWinner && <WinnerPage />}
      </>
   );
}

export default Room;
