import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/login" className="nav-link">Login</Link>
      <Link to="/registration" className="nav-link">Registration</Link>
      <Link to="/jobs" className="nav-link">Jobs</Link>
    </nav>
  );
};

export default Navbar;
