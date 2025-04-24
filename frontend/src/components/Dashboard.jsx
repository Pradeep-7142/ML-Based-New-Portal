import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import JobList from './JobList';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const location = useLocation();
  const user = location.state?.user || JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recommendations/${user.id}`);
        setJobs(response.data.jobs);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    if (user && user.id) {
      fetchRecommendations();
    }
  }, [user]); // Now only depends on user

  if (!user) {
    return <div className="dashboard-container">Please login to view your dashboard</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.name}</h1>
      <div className="user-info">
        <p><strong>Profession:</strong> {user.profession || 'Not specified'}</p>
        <p><strong>Skills:</strong> {user.skills}</p>
        <p><strong>Interests:</strong> {user.interests}</p>
      </div>
      
      <div className="recommendations-section">
        <h2>Recommended Jobs For You</h2>
        <JobList jobs={jobs} />
      </div>
    </div>
  );
};

export default Dashboard;