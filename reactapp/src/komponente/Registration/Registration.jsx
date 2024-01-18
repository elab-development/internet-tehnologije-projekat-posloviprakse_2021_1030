import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';  

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name,
        email,
        password,
        role,
      });

      console.log(response.data);
    
    } catch (error) {
      console.error('Registration failed:', error.response.data.errors);
    }
  };

  return (
    <div className="login-container">
      <h2>Registration</h2>
      <div className="input-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
       
          <option value="firma">Firma</option>
          <option value="student">Student</option>
        </select>
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Registration;
