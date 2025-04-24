import React from 'react';
import '../styles/dashboard.css';

const JobList = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return <p>No job recommendations available. Update your profile and preferences to get recommendations.</p>;
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div key={job.id} className="job-card">
          <h3>{job.title}</h3>
          <p className="company">{job.company}</p>
          <p className="description">{job.description}</p>
          <div className="tags">
            {job.tags.split(',').map((tag, index) => (
              <span key={index} className="tag">{tag.trim()}</span>
            ))}
          </div>
          <a href={job.url} target="_blank" rel="noopener noreferrer" className="apply-button">
            View Job
          </a>
        </div>
      ))}
    </div>
  );
};

export default JobList;


