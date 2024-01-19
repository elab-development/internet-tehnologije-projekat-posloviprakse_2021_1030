import React, { useState } from 'react';
import './JobList.css';
import JobCard from './JobCard';
import useJobs from '../customHooks/useJobs';

const JobList = () => {
  const { jobs } = useJobs('http://127.0.0.1:8000/api/jobs');
  const [filter, setFilter] = useState({});
  const [salaryRange, setSalaryRange] = useState({ min: '', max: '' });

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSalaryChange = (e) => {
    setSalaryRange({ ...salaryRange, [e.target.name]: e.target.value });
  };

  const salaryFilter = (job) => {
    const minSalary = salaryRange.min ? parseInt(salaryRange.min) : 0;
    const maxSalary = salaryRange.max ? parseInt(salaryRange.max) : Infinity;
    return job.salary >= minSalary && job.salary <= maxSalary;
  };

  const filteredJobs = jobs.filter(job => {
    return Object.entries(filter).every(([key, value]) =>
      !value || job[key]?.toString().toLowerCase().includes(value.toLowerCase())
    ) && salaryFilter(job);
  });

  return (
    <div>
      <div className="filter-form">
        <input type="text" name="title" placeholder="Title" onChange={handleFilterChange} />
        <input type="text" name="location" placeholder="Location" onChange={handleFilterChange} />
      
        <input type="number" name="min" placeholder="Min Salary" onChange={handleSalaryChange} />
        <input type="number" name="max" placeholder="Max Salary" onChange={handleSalaryChange} />
      
      </div>
      <div className="job-list">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
