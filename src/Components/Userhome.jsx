// src/components/UserPage.js
import React from 'react';
import UserSidebar from './UserSidebar'; // Import the Sidebar component
import imagehome from '../assets/imagehome.png';
import './Userhome.css'
const Userhome = () => {
    return (
      <div className="home">
      
        <UserSidebar />
        <div className="content">
          <h2 className='welcometext'>Welcome to your Dashboard!</h2>
          <img src={imagehome} alt='homeimage' />
          <button className='uploadButton'>Take a Picture</button>  
        </div>
      </div>
    );
  };

export default Userhome;
