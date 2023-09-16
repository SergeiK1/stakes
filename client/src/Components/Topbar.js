import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Topbar.css';

const TopNavbar = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Fetch user's balance from the backend
    axios.get('http://localhost:8800/getBalance') // Assuming this is the endpoint to get user's balance
      .then(response => {
        setBalance(response.data.balance);
      })
      .catch(error => {
        console.error("Error fetching balance:", error);
      });
  }, []);


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
        <a href='/'>{balance}</a>
      </div>
    </div>
  );
}

export default TopNavbar;
