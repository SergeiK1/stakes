import React from 'react';
import '../Styles/Topbar.css';

const TopNavbar = () => {
  return (
    <div className="top-navbar">
        <a className="logo" href='/'>
          <img src='images/logo.png' alt='logo'></img>
          <span>Stakes</span>
        </a>
      <div className="nav-links">
        <a href="/">Leaderboard</a>
        <a href="/">Friends</a>
        <a href="/">FAQ</a>
      </div>
      <div className='moneycounter'>
        <img src='images/coin.png' alt="coin"></img>
        <a href='/'>7,383,490</a>
      </div>
    </div>
  );
}

export default TopNavbar;
