import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './JobApplications.css';

const JobApplications = () => {
  const { id } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/applications/job/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        setApplications(response.data.data); // Assuming the response has a data field
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchApplications();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="applications-container">
      <h2>Applications for Job ID: {id}</h2>
      <table className="applications-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User </th>
            <th>Status</th>
            <th>Cover Letter</th>
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(application => (
            <tr key={application.id}>
              <td>{application.id}</td>
              <td>{application.user.name}</td>
              <td>{application.status}</td>
              <td>{application.cover_letter ? <a href={`http://127.0.0.1:8000/storage/${application.cover_letter}`} target="_blank" rel="noopener noreferrer">View</a> : 'N/A'}</td>
              <td>{application.resume ? <a href={`http://127.0.0.1:8000/storage/${application.resume}`} target="_blank" rel="noopener noreferrer">View</a> : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobApplications;
