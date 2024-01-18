import React, { useState, useEffect } from 'react';
 

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      <p>Deadline: {job.deadline}</p>
      <p>Salary: {job.salary}</p>
      <p>Location: {job.location}</p>
      <p>Requirements: {job.requirements}</p>
      <p>Company: {job.company.name}</p>
    </div>
  );
};


export default JobCard;