import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobList.css';
import JobCard from './JobCard';
const JobList = () => {
    const [jobs, setJobs] = useState([]); 
    useEffect(() => {
      const fetchJobs = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/jobs');
          setJobs(response.data.data);
        } catch (error) {
          console.error('Error fetching jobs:', error);
        }
      };
  
      fetchJobs();
    }, []);
  
    return (
      <div className="job-list">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    );
  };
  
  export default JobList;