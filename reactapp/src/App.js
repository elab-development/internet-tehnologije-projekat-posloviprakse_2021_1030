import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './komponente/login/Login';
import JobList from './komponente/jobs/JobList';
import Registration from './komponente/Registration/Registration';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/jobs" element={<JobList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
