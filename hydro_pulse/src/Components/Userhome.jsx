// src/components/UserPage.js
import React from 'react';
import UserSidebar from './UserSidebar'; // Import the Sidebar component
import imagehome from '../assets/imagehome.png';
import './Userhome.css'
import { useNavigate } from 'react-router-dom';

const Userhome = () => {
  const history = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    history('/Login');
  };
    return (
      <div className="home">
      
      <UserSidebar handleLogout={handleLogout} /> 
        <div className="content">
          <h2 className='welcometext'>Welcome to your Dashboard!</h2>
          <img src={imagehome} alt='homeimage' />
          <button className='uploadButton'>Take a Picture</button>  
        </div>
      </div>
    );
  };

export default Userhome;
