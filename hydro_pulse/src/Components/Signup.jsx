// components/Register.js

import React, { useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('Authority');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        fullName,
        email,
        phoneNumber,
        password
      });

      console.log('User registered successfully');
      // Redirect or display success message
    } catch (error) {
      console.error('Error registering user:', error.response.data.error);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="register-container">
      <h1>Create an Account</h1>
      <p>Securely login to your account</p>
      {error && <div className="error-message">{error}</div>}
      <div className="role-selection">
        <button
          className={selectedRole === 'Authority' ? 'selected' : ''}
          onClick={() => setSelectedRole('Authority')}
        >
          Authority
        </button>
        <button
          className={selectedRole === 'Citizen' ? 'selected' : ''}
          onClick={() => setSelectedRole('Citizen')}
        >
          Citizen
        </button>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className='createAccbutton' onClick={handleRegister}>Create Account</button>
      <p className="login-link">I Already Have an Account<Link to="/Login">Log In</Link></p>
    </div>
  );
};

export default Register;
