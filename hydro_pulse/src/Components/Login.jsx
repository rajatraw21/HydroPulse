import React, { useState } from 'react';
import './Login.css'; // Import your CSS file here
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      // Update loggedIn state to true upon successful login
      setLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error.response.data.error);
      setError(error.response.data.error);
    }
  };

  // If loggedIn state is true, redirect user to /Userhome
  if (loggedIn) {
    return <Navigate to="/Userhome" />;
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <p>Securely login to your account</p>
      {error && <div className="error-message">{error}</div>}
      <div className="input-container">
        <input
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <a href="" className="forgot-password">Forgot Password</a>
      <button onClick={handleLogin}>LOG IN</button>
      <p className="continue">
        - Or continue with -
      </p>
      <div className="social-login">
        <button>G Google</button>
        <button>F Facebook</button>
      </div>
      <p className="create-account">
        Create an Account <Link to="/Signup">Sign Up</Link>
      </p>
      <p className="create-account">
        By clicking Continue, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
};

export default Login;
