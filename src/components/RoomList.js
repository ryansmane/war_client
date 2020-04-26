import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Player } from '../classes/Player';


const ROOM_CAPACITY = 4;

function RoomList(props) {
    let socket = props.socket;
    const [roomList, setRooms] = useState(); 
    const [roomName, setRoomName] = useState();
    
    useEffect(() => {
        socket.on('return-rooms', (rooms) => {
            setRooms(rooms);
        });
        
    })


    const createRoom = (e) => {
        e.preventDefault();
        let p = new Player(socket.id)
        let roomData = {
            host: socket.id,
            name: roomName,
            players: [p]
        };
        socket.emit('create-room', roomData);
        props.routerProps.history.push(`/cardroom/${roomData.name}`);
    }

    const joinRoom = (name, e) => {
        e.preventDefault();
        setRooms(roomList.filter(r => r.name !== name));
        let p = new Player(socket.id);
        socket.emit('join-room', {name: name, player: p})
        props.routerProps.history.push(`/cardroom/${name}`);
    }

    return (
        <div>
            <h3>RoomList</h3>
            <ul>
                {roomList && roomList.map(room => {
                    if (room.players.length < ROOM_CAPACITY) {
                        return (
                        <li>Room Name: {room.name} || Room Host: {room.host} || Members: {room.players.length} / {ROOM_CAPACITY} <button onClick={(e) => joinRoom(room.name, e)}>Join</button></li> 
                        )
                }})}
            </ul>
            <form className='ifield'>
                <input type='text' onChange={(e) => setRoomName(e.target.value)}/>
                <button type='button' onClick = {(e) => createRoom(e)}>Create Room</button> 
            </form>
        </div>
    )
}

export default RoomList;