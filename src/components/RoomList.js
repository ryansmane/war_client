import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
const _ = require('lodash');
const {lowercase, uppercase} = require('../util/letters')



function RoomList(props) {
    let socket = props.socket;
    const [roomList, setRoomList] = useState({}); 
    const [roomName, setRoomName] = useState('');
    const [roomCap, setRoomCap] = useState(2);
    const [waiting, setWaiting] = useState(false);
    const [username, setUserName] = useState();
    const [emptyFlag, setEmptyFlag] = useState(false);
    const [joinedHost, setJoinedHost] = useState('');

    useEffect(() => {
        setUserName(`${_.sample(uppercase)}${_.sample(lowercase)}`);
        socket.on('return-rooms', (rooms) => {
            
            setRoomList(rooms);
            console.log(rooms);
        });

        socket.on('all-players-in', id => {
            props.routerProps.history.push(`/cardroom/${id}`);
        })
    },[])


    const createRoom = (e) => {
        e.preventDefault();
        if (roomName === '') {
            setEmptyFlag(true);
        } else {
        setEmptyFlag(false);
        setWaiting(true);
        setJoinedHost(socket.id);
        let roomData = {
            host: socket.id,
            name: roomName,
            assigned: false,
            capacity: roomCap,
            desiredName: username
        };
        socket.emit('create-room', roomData);
        }
        
    }

    const joinRoom = (host, name, e) => {
        setWaiting(true)
        e.preventDefault();
        setJoinedHost(host);
        socket.emit('join-room', {host, name, username})
        
    }

    const showCreateBox = () => {
        const box = document.querySelector('.create-box');
        const button = document.querySelector('.button-create');
        box.style.display = box.style.display === 'none' ? 'block' : 'none';
        button.style.display = 'none';
    }

    return (
       <div>
          {!waiting && username && (
             <>
                <div className='waiting-room'>
                   <h2>
                      Welcome, Shark <em>{username}</em>!
                   </h2>
                   <h3>Card Rooms:</h3>
                   <ul>
                      {Object.values(roomList).length === 0 && (
                         <li>No Lobbies At This Time</li>
                      )}
                      {roomList &&
                         Object.values(roomList).map((room) => {
                            return (
                               <li>
                                  Room Name:{room.name} | Members:{' '}
                                  {Object.keys(room.players).length} /{' '}
                                  {room.capacity}
                                  {room.capacity >
                                     Object.keys(room.players).length && (
                                     <>
                                        <button
                                           onClick={(e) =>
                                              joinRoom(room.host, room.name, e)
                                           }
                                        >
                                           Join Room
                                        </button>
                                     </>
                                  )}
                                  {room.capacity <=
                                     Object.keys(room.players).length && (
                                     <>
                                        <span>(Full)</span>
                                     </>
                                  )}
                               </li>
                            );
                         })}
                   </ul>

                   <button
                      className='button-create'
                      onClick={() => showCreateBox()}
                   >
                      Create Room
                   </button>
                   <div style={{ display: 'none' }} className='create-box'>
                      <form className='ifield'>
                         <div>
                            <label>Room Name</label>

                            <input
                               type='text'
                               onChange={(e) => setRoomName(e.target.value)}
                            />
                         </div>
                         {emptyFlag && (
                            <p style={{ textAlign: 'center' }}>
                               Room name cannot be empty.
                            </p>
                         )}
                         <div className='form-cap'>
                            <label>Players:</label>
                            <Form.Control
                               onChange={(e) => setRoomCap(e.target.value)}
                               as='select'
                            >
                               <option>2</option>
                               <option>3</option>
                               <option>4</option>
                               <option>5</option>
                               <option>6</option>
                            </Form.Control>
                         </div>

                         <div className='form-cap'>
                            <label>Game:</label>
                            <Form.Control as='select'>
                               <option>War</option>
                            </Form.Control>
                         </div>
                         <button type='button' onClick={(e) => createRoom(e)}>
                            Create Room
                         </button>
                      </form>
                   </div>
                </div>
             </>
          )}
          {waiting && Object.values(roomList).length > 0 && (
             <div>
                <h1>Waiting for more players...</h1>
                <h4>Settings:</h4>
                <p>{`Room Name: ${roomName}`}</p>
                {roomList[joinedHost] && (
                   <p>{`Joined Players: ${
                      Object.values(roomList[joinedHost].players).length
                   }/${roomList[joinedHost].capacity}`}</p>
                )}
                <p>{`Game: War`}</p>
             </div>
          )}
       </div>
    );
}

export default RoomList;