import React, { useState } from "react";
import '../styles/dashboard.css';
import "../styles/JobCard.css";

const JobList = ({ jobs }) => {
  const [expandedJobId, setExpandedJobId] = useState(null);

  if (!jobs || jobs.length === 0) {
    return <p>No job recommendations available. Update your profile and preferences to get recommendations.</p>;
  }

  const toggleDescription = (jobId) => {
    setExpandedJobId(prevId => (prevId === jobId ? null : jobId));
  };

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div key={job.id} className="job-card">
          <li>Active From- {new Date(job.tags).toDateString()}</li>
          <h2>{job.title}</h2>
          <h4>{job.company} - {job.location}</h4>
          <div className="buttonHandle">
            <button onClick={() => toggleDescription(job.id)}>
              {expandedJobId === job.id ? "Hide" : "Job Description"}
            </button>
            {expandedJobId === job.id && (
              <div className="description-box">
                <p>{job.description}</p>
              </div>
            )}

            <a href={job.url} target="_blank" rel="noopener noreferrer">Apply</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;


