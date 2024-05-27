import React, { useState } from 'react';
import axios from 'axios';
import './JobCard.css';

const JobCard = ({ job }) => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [resume, setResume] = useState(null);
  const user = JSON.parse(sessionStorage.getItem('user'));

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const applyForJob = async () => {
    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('job_id', job.id);
    formData.append('status', 'applied');
    if (resume) {
      formData.append('resume', resume);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/application', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      console.log(response);
      setMessage('Application submitted successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to apply for the job. Please try again.');
    }
  };

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      <p>Deadline: {job.deadline}</p>
      <p>Salary: {job.salary}</p>
      <p>Location: {job.location}</p>
      <p>Requirements: {job.requirements}</p>
      <p>Company: {job.company.name}</p>
      <input type="file" onChange={handleFileChange} />
      <button onClick={applyForJob}>Apply</button>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default JobCard;
