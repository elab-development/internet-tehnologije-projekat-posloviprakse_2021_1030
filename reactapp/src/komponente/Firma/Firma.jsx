import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Firma.css';

const Firma = () => {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    deadline: '',
    requirements: '',
  });
  const [updatedJob, setUpdatedJob] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    deadline: '',
    requirements: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndCompany = async () => {
      try {
        // Fetch user data along with company data
        const response = await axios.get('http://127.0.0.1:8000/api/user', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        const userData = response.data.user;
        setUser(userData);

        // Extract company data from user data
        const companyData = userData.company;
        setCompany(companyData);

        // Assuming jobs are part of the company data
        if (companyData && companyData.jobs) {
          setJobs(companyData.jobs);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserAndCompany();
  }, []);

  const deleteJob = async (jobId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });

      // Remove job from local state
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (err) {
      console.error('Error deleting job:', err);
      setError('Error deleting job. Please try again.');
    }
  };

  const startEditing = (job) => {
    setEditingJob(job.id);
    setUpdatedJob({
      title: job.title,
      description: job.description,
      location: job.location,
      salary: job.salary,
      deadline: job.deadline,
      requirements: job.requirements,
      company_id: user.company.id
    });
  };

  const updateJob = async (jobId) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/jobs/${jobId}`, updatedJob, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });

      // Update job in local state
      setJobs(jobs.map(job => (job.id === jobId ? response.data.job : job)));
      setEditingJob(null);
    } catch (err) {
      console.error('Error updating job:', err);
      setError('Error updating job. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedJob({ ...updatedJob, [name]: value });
  };

  const handleNewJobChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const createJob = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/jobs', { ...newJob, company_id: user.company.id }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });

      // Add new job to local state
      setJobs([...jobs, response.data.job]);
      // Reset new job form
      setNewJob({
        title: '',
        description: '',
        location: '',
        salary: '',
        deadline: '',
        requirements: ''
      });
    } catch (err) {
      console.error('Error creating job:', err);
      setError('Error creating job. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="firma-container">
      {company && (
        <div className="firma-details">
          <h2>{company.name}</h2>
          <p><strong>Description:</strong> {company.description}</p>
          <p><strong>Contact Info:</strong> {company.contact_info}</p>
          <p><strong>Website:</strong> <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a></p>
          <p><strong>Industry:</strong> {company.industry}</p>

          <h3>Create New Job</h3>
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newJob.title}
              onChange={handleNewJobChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newJob.description}
              onChange={handleNewJobChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={newJob.location}
              onChange={handleNewJobChange}
            />
            <input
              type="text"
              name="salary"
              placeholder="Salary"
              value={newJob.salary}
              onChange={handleNewJobChange}
            />
            <input
              type="text"
              name="deadline"
              placeholder="Deadline"
              value={newJob.deadline}
              onChange={handleNewJobChange}
            />
            <input
              type="text"
              name="requirements"
              placeholder="Requirements"
              value={newJob.requirements}
              onChange={handleNewJobChange}
            />
            <button onClick={createJob}>Create</button>
          </div>

          <h3>Jobs:</h3>
          {jobs.length > 0 ? (
            <ul>
              {jobs.map(job => (
                <li key={job.id}>
                  {editingJob === job.id ? (
                    <div>
                      <input
                        type="text"
                        name="title"
                        value={updatedJob.title}
                        onChange={handleInputChange}
                      />
                      <input
                        type="text"
                        name="description"
                        value={updatedJob.description}
                        onChange={handleInputChange}
                      />
                      <input
                        type="text"
                        name="location"
                        value={updatedJob.location}
                        onChange={handleInputChange}
                      />
                      <input
                        type="text"
                        name="salary"
                        value={updatedJob.salary}
                        onChange={handleInputChange}
                      />
                      <input
                        type="text"
                        name="deadline"
                        value={updatedJob.deadline}
                        onChange={handleInputChange}
                      />
                      <input
                        type="text"
                        name="requirements"
                        value={updatedJob.requirements}
                        onChange={handleInputChange}
                      />
                      <button onClick={() => updateJob(job.id)}>Save</button>
                      <button onClick={() => setEditingJob(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <h4>{job.title}</h4>
                      <p>{job.description}</p>
                      <p><strong>Location:</strong> {job.location}</p>
                      <p><strong>Salary:</strong> {job.salary}</p>
                      <p><strong>Deadline:</strong> {job.deadline}</p>
                      <p><strong>Requirements:</strong> {job.requirements}</p>
                      <button onClick={() => startEditing(job)}>Edit</button>
                      <button onClick={() => deleteJob(job.id)}>Obriši</button>
                      <button onClick={() => navigate(`/firma/job/${job.id}`)}>Vidi prijave</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No jobs available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Firma;
