import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:3001');

const ROOM_CAPACITY = 2;

function RoomList(props) {
    console.log(props)
    let socket = props.socket;
    const [roomList, setRooms] = useState();
    const [userID, setUserID] = useState();   
    const [roomName, setRoomName] = useState();
    
    useEffect(() => {
        socket.on('return-rooms', (rooms) => {
            setRooms(rooms);
        });
        socket.on('new-user', s => {
            setUserID(s);
        })
    })


    const createRoom = (e) => {
        e.preventDefault();

        let roomData = {
            host: userID,
            name: roomName,
            members : 1
        };
        socket.emit('create-room', roomData);
        props.routerProps.history.push(`/cardroom/${roomData.host}`);
    }

    const joinRoom = (host) => {
        setRooms(roomList.filter(r => r.host !== host));
        socket.emit('join-room', host)
        props.routerProps.history.push(`/cardroom/${host}`);
    }

    return (
        <div>
            <h3>RoomList</h3>
            <ul>
                {roomList && roomList.map(room => {
                    if (room.members < ROOM_CAPACITY) {
                        return (
                        <li>Room Name: {room.name} || Room Host: {room.host} || Members: {room.members} / {ROOM_CAPACITY} <Link path={`/cardroom/${room.host}`}><button onClick={() => joinRoom(room.host)}>Join</button></Link></li> 
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