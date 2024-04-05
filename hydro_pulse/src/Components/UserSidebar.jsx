import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { UserSidebardata } from './UserSidebardata';
import './UserSidebar.css';
import { IconContext } from 'react-icons';
import { useNavigate } from 'react-router-dom'; // Import useHistory

function UserSidebar({ handleLogout }) {
  const [sidebar, setSidebar] = useState(false);
  const history = useNavigate(); // Initialize useHistory

  const showSidebar = () => setSidebar(!sidebar);

  // Function to handle logout
  const logout = () => {
    handleLogout(); // Call handleLogout function passed from parent component
    history('/Login'); // Redirect to login page
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#62CDFA' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} color='#ffffff'/>
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose color='#62CDFA'/>
              </Link>
            </li>
            <div className='icon-wrapper'>
              {UserSidebardata.map((item, index) => {
                return (
                  <li key={index} className={`icon-item ${item.cName}`}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
              {/* Logout button */}
              
            </div>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default UserSidebar;
