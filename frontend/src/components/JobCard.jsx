import React, { useState } from "react";
import "../styles/JobCard.css";

const JobCard = ({ job }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="job-card">
      <h2>{job.title}</h2>
      <h4>{job.company} - {job.location}</h4>
      <button onClick={() => setShowDescription(!showDescription)}>
        {showDescription ? "Hide" : "Job Description"}
      </button>
      {showDescription && <p>{job.description}</p>}
      
      <a href={job.url} target="_blank" rel="noopener noreferrer">Apply</a>
    </div>
  );
};

export default JobCard;

