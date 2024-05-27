import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './komponente/login/Login';
import JobList from './komponente/jobs/JobList';
import Registration from './komponente/Registration/Registration';
import Navbar from './komponente/Navbar/Navbar';
import JoobleListings from './komponente/joobleAPI/JoobleListings';
import Firma from './komponente/Firma/Firma';
import JobApplications from './komponente/Firma/JobApplications';

function App() {
  const [token,setToken]= useState(null);
  return (
    <Router>
      <div className="App">
        <Navbar token={token}  setToken={setToken}  ></Navbar>
        <Routes>
          <Route path="/" element={<Login setToken={setToken}/>} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/jobs" element={<JobList />} />
          {/* <Route path="/jooble" element={<JoobleListings />} />  */}
          {/* pod komentarom zbog ogranicenog broja upita */}


          {/* za seminarski */}
          <Route path="/firma/job/:id" element={<JobApplications />} />
          <Route path="/firma" element={<Firma />} />  

         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
