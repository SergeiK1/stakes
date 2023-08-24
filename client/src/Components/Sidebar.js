import React from 'react';
import '../Styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top-buttons">
        <button class="navbutton button1=">Roulette</button>
        <button class="navbutton button2">Coin Flip</button>
        <button class="navbutton button3">Slots</button>
        <button class="navbutton button4">Dice</button>
      </div>
      <div className="bottom-buttons">
        <button class="navbutton profile">Profile</button>
        <button class="navbutton settings">Settings</button>
      </div>
    </div>
  );
}

export default Sidebar;
