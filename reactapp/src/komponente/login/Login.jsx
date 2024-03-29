import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css'
import { useNavigate } from 'react-router-dom';
const Login = ({setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });

      console.log(response.data);
      setToken(response.data.token)
      sessionStorage.setItem("token",response.data.token)
      sessionStorage.setItem("user",response.data.user)
      navigate('/jobs')
    } catch (error) {
        
         console.error('Login failed:', error.response.data.error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="input-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
