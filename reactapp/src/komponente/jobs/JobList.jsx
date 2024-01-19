import React, { useState } from 'react';
import './JobList.css';
import JobCard from './JobCard';
import useJobs from '../customHooks/useJobs';

const JobList = () => {
  const { jobs } = useJobs('http://127.0.0.1:8000/api/jobs');
  const [filter, setFilter] = useState({});
  const [salaryRange, setSalaryRange] = useState({ min: '', max: '' });
  const [sortKey, setSortKey] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [view, setView] = useState('list'); // 'grid' for grid view

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

  const handleSortChange = (key) => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortKey(key);
  };

  const sortedJobs = [...jobs]
    .filter(job => Object.entries(filter).every(([key, value]) =>
      !value || job[key]?.toString().toLowerCase().includes(value.toLowerCase())
    ) && salaryFilter(job))
    .sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const toggleView = () => {
    setView(view === 'list' ? 'grid' : 'list');
  };

  return (
    <div>
      <div className="filter-form">
        <input type="text" name="title" placeholder="Title" onChange={handleFilterChange} />
        <input type="text" name="location" placeholder="Location" onChange={handleFilterChange} />
        <input type="number" name="min" placeholder="Min Salary" onChange={handleSalaryChange} />
        <input type="number" name="max" placeholder="Max Salary" onChange={handleSalaryChange} />
      </div>
      <div className="sort-buttons">
        <button onClick={() => handleSortChange('title')}>Sort by Title</button>
        <button onClick={() => handleSortChange('salary')}>Sort by Salary</button>
        <button onClick={() => handleSortChange('date')}>Sort by Date</button>
        <button onClick={toggleView}>Toggle View</button>
      </div>
      <div className={`job-list ${view}`}>
        {sortedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
