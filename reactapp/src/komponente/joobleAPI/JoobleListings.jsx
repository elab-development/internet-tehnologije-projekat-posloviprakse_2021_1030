import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JoobleListings.css';

const JoobleListings = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://jooble.org/api/";
        const key = "22a77a17-c8b0-44ce-b553-006853f5077e";  
        const params = {
          keywords: 'it',
          limit: 20,  
        };

        const response = await axios.post(url + key, params, {
          headers: {
            "Content-Type": "application/json"
          }
        });

        setJobPostings(response.data.jobs);
        setTotalPages(Math.ceil(20 / itemsPerPage));
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Update displayed jobs when currentPage changes
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedJobs(jobPostings.slice(startIndex, endIndex));
  }, [currentPage, jobPostings]);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

 

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(totalPages)
  return (
    <div className="jooble-listings">
      <h2>Job Listings</h2>
      <ul>
        {displayedJobs.map((job, index) => (
          <li key={job.id || index}> 
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
      <div className="pagination">
      {
        Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button 
            key={page} 
            onClick={() => goToPage(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))
      }
    </div>
    </div>
  );
};

export default JoobleListings;
