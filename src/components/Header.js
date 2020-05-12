import React from 'react';

function Header() {
   return (
      <div className='header-box'>
         <img
            className='logo'
            src='../images/logo.png'
            alt='a cute shark holding cards'
         ></img>
         <div className='title-box'>
            <h1>Shark Haven</h1>
         </div>
      </div>
   );
}

export default Header;
