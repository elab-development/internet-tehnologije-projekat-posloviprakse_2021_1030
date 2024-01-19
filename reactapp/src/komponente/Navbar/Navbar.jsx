import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = ({token,setToken}) => {
    const navigate = useNavigate();
  
    const handleLogout = async () => {
      try {
        await axios.post('http://127.0.0.1:8000/api/logout', {}, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        sessionStorage.clear();
        setToken(null)
        navigate('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      
      }
    };
  
    return (
      <nav className="navbar">
        {token == null ? (
          <>
            <Link to="/" className="nav-link">Login</Link>
            <Link to="/registration" className="nav-link">Registration</Link>
          </>
        ) : (
          <>
            <Link to="/jobs" className="nav-link">Jobs</Link>
            <Link to="/jooble" className="nav-link">Jooble</Link>
            <button onClick={handleLogout} className="nav-link">Logout</button>
          </>
        )}
      </nav>
    );
  };
  
  export default Navbar;
  