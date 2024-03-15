// src/components/Login.js

import React, { useState } from 'react';
import './Login.css'; // Import your CSS file here
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic (e.g., API calls, authentication)
    console.log('Logging in with:', email, password);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <p>Securely login to your account</p>
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
