import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './komponente/login/Login';
import JobList from './komponente/jobs/JobList';
import Registration from './komponente/Registration/Registration';
import Navbar from './komponente/Navbar/Navbar';
import JoobleListings from './komponente/joobleAPI/JoobleListings';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jooble" element={<JoobleListings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
