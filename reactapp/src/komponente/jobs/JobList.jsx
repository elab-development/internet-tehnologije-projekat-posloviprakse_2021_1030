import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobList.css';
import JobCard from './JobCard';
import useJobs from '../customHooks/useJobs';
const JobList = () => {
    const { jobs, setJobs } = useJobs('http://127.0.0.1:8000/api/jobs');  
  
    return (
      <div className="job-list">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    );
  };
  
  export default JobList;