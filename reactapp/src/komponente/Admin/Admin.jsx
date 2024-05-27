import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './Admin.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Admin = () => {
  const [stats, setStats] = useState({});
  const [companyStats, setCompanyStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/admin/statistics', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        setStats(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchCompanyStats = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/admin/all-company-statistics', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        setCompanyStats(response.data.companies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    fetchCompanyStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const barData = {
    labels: ['Companies', 'Students', 'Admins', 'Ads', 'Applications'],
    datasets: [
      {
        label: 'Count',
        data: [
          stats.total_companies,
          stats.total_students,
          stats.total_admins,
          stats.total_ads,
          stats.total_applications
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  const pieData = {
    labels: ['Companies', 'Students', 'Admins', 'Ads', 'Applications'],
    datasets: [
      {
        label: 'Count',
        data: [
          stats.total_companies,
          stats.total_students,
          stats.total_admins,
          stats.total_ads,
          stats.total_applications
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      }
    ]
  };

  const companyNames = companyStats.map(company => company.company.name);
  const totalJobsData = companyStats.map(company => company.total_jobs);
  const totalApplicationsData = companyStats.map(company => company.total_applications);
  const totalUsersData = companyStats.map(company => company.total_users);

  const jobsBarData = {
    labels: companyNames,
    datasets: [
      {
        label: 'Total Jobs',
        data: totalJobsData,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }
    ]
  };

  const applicationsBarData = {
    labels: companyNames,
    datasets: [
      {
        label: 'Total Applications',
        data: totalApplicationsData,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      }
    ]
  };

  const usersBarData = {
    labels: companyNames,
    datasets: [
      {
        label: 'Total Users',
        data: totalUsersData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="admin-container">
      <h1>Admin Statistics</h1>
      <div className="chart-container">
        <Bar data={barData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Overall Statistics' } } }} />
      </div>
      <div className="chart-container">
        <Pie data={pieData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Overall Distribution' } } }} />
      </div>
      <h2>Company Statistics</h2>
      <div className="chart-container">
        <Bar data={jobsBarData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Total Jobs by Company' } } }} />
      </div>
      <div className="chart-container">
        <Bar data={applicationsBarData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Total Applications by Company' } } }} />
      </div>
      <div className="chart-container">
        <Bar data={usersBarData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Total Users by Company' } } }} />
      </div>
    </div>
  );
};

export default Admin;
