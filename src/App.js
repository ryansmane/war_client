import React from 'react';
import Header from './components/Header'
import RoomList from './components/RoomList'
import Room from './components/Room';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:3001');


function App() {
   
  return (
     <>
     <header>
        <Header />
     </header>
     <main>
        <Switch>
           <Route exact path='/' render={(routerProps) => {
              return <RoomList socket={socket} routerProps={routerProps} />
           }}/>
           <Route path='/cardroom/:roomID' render={(routerProps) => {
              return <Room socket={socket} routerProps={routerProps} />
           }} />
        </Switch>
      </main>
     </>
  );
}

export default App;
