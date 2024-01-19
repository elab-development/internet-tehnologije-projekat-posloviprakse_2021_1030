import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JoobleListings.css';
const JoobleListings = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = "https://jooble.org/api/";
    const key = "22a77a17-c8b0-44ce-b553-006853f5077e"; // Replace with your actual API key
    const params = {
      keywords: 'it',
    
    };

    axios.post(url + key, params, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      setJobPostings(response.data.jobs);
      setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="jooble-listings">
      <h2>Job Listings</h2>
      <ul>
        {jobPostings.map((job, index) => (
          <li key={index}>
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Description:</strong> <span dangerouslySetInnerHTML={{ __html: job.snippet }}></span></p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary || "Not specified"}</p>
            <p><strong>Source:</strong> {job.source}</p>
            <p><strong>Updated:</strong> {new Date(job.updated).toLocaleDateString()}</p>
            <a href={job.link} target="_blank" rel="noopener noreferrer">More details</a>
          </li>
        ))}
      </ul>
    </div>
  );
  
 
};

export default JoobleListings;
