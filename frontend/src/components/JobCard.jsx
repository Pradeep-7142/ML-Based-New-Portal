import React, { useState } from "react";
import "../styles/JobCard.css";

const JobCard = ({ job }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="job-card">
      <li>Active From- {new Date(job.tags).toDateString()}</li>
      <h2>{job.title}</h2>
      <h4>{job.company} - {job.location}</h4>
      <div className="buttonHandle">
        <button onClick={() => setShowDescription(!showDescription)}>
          {showDescription ? "Hide" : "Job Description"}
        </button>
        {showDescription && (
          <div className="description-box">
            <p>{job.description}</p>
          </div>
        )}


        <a href={job.url} target="_blank" rel="noopener noreferrer">Apply</a>
      </div>

    </div>
  );
};

export default JobCard;

