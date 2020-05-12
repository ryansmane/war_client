import React, { useEffect, useState } from 'react';

function Arena(props) {
   const [me, setMyself] = useState();
   const [enemies, setEnemies] = useState();

   useEffect(() => {
      if (props.data && props.mySocket) {
         let info = props.data.info[0];

         let enemies = [];
         for (let i = 0; i < info.length; i++) {
            if (info[i].id === props.mySocket) {
               setMyself(info[i]);
            } else {
               enemies.push(info[i]);
            }
         }

         setEnemies(enemies);
      }
   }, [props.data]);

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
         <h1>Arena</h1>
         {enemies && me && (
            <div>
               <div className='enemy-cards'>
                  {enemies.map((e) => {
                     return (
                        <div className='single-enemy'>
                           <img
                              className='card'
                              src={getPath(e.top.pip, e.top.suit)}
                              alt={`${e.top.pip} ${e.top.suit}`}
                           ></img>
                        </div>
                     );
                  })}
               </div>
               <div className='my-card'>
                  <img
                     className='card'
                     src={getPath(me.top.pip, me.top.suit)}
                     alt={`${me.top.pip} ${me.top.suit}`}
                  ></img>
               </div>
            </div>
         )}
      </>
   );
}

export default Arena;
