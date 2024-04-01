import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import './JoobleListings.css';

const fetchJobPostings = async () => {
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

  return response.data.jobs;
};

const JoobleListings = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const { data: jobPostings, isLoading, isError, error } = useQuery('jobs', fetchJobPostings, {
    keepPreviousData: true, // This option keeps the previous data until the new data is fetched
  });

  const totalPages = jobPostings ? Math.ceil(jobPostings.length / itemsPerPage) : 0;

  const displayedJobs = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return jobPostings?.slice(startIndex, endIndex);
  }, [currentPage, jobPostings]);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
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
