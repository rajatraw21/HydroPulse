import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Userhome from './Components/Userhome';
import Report from './Components/Report';
import MapComponent from './Components/MapComponent';
import Map from './Components/Map';
import axios from 'axios';
import 'tailwindcss/tailwind.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
      <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        {isLoggedIn ? (
          <>
            <Route path="/Userhome" element={<Userhome />} />
            <Route path="/Report" element={<Report />} />
            <Route path="/MapComponent" element={<MapComponent />} />
            <Route path="/map" element={<Map />} />
          </>
        ) : (
          <Route path="/Login" element={<Navigate to="/Login" />} />
        )}
        
      </Routes>
    </Router>
  );
}

export default App;
