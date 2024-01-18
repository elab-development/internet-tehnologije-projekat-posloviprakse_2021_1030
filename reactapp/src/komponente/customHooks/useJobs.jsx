import { useState, useEffect } from 'react';
import axios from 'axios';

const useJobs = (url) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(url);
        setJobs(response.data.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [url]);

  return { jobs, setJobs };
};

export default useJobs;
