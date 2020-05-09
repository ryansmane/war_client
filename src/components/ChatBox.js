import React, { useEffect, useState } from 'react';

function ChatBox(props) {

    const host = props.host;
    const socket = props.socket;
    const [messages, setMessages] = useState();
    const [currentMessage, setCurrentMessage] = useState('');

    useEffect(() => {
        socket.on('messages-update', messages => {
            setMessages(messages);
        })
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('send-message', {message: currentMessage, host: host, id: props.id});
        e.target.value = '';
        setCurrentMessage('');
    }

    return (
        <div className='chat-box'>
        <form>
        <input value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)}></input>
        <button onClick={(e) => sendMessage(e)}>Send</button>
        </form>
        <div>
        {messages && messages.map(m => {
            return (
            <p>{m.sender}: {m.message}</p>
            )
        })}
        </div>
        <p>Game Started</p>
        </div>
    )
}

export default ChatBox;
