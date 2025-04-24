import React, { useState } from "react";
import JobCard from "./JobCard";
import '../App.css';
import '../styles.css';

export default function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");

  const fetchJobs = async (endpoint) => {
    try {
      const res = await fetch(`http://localhost:5000/${endpoint}`, {
        credentials: "include",
      });

      const text = await res.text();
      console.log("Raw response text:", text);

      const data = JSON.parse(text);

      if (res.ok) {
        setJobs(data);
        setMessage("");
      } else {
        setJobs([]);
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobs([]);
      setMessage("Error fetching jobs.");
    }
  };
  return (
    <div>
      <div className="button-container">
        <button onClick={() => fetchJobs("all-jobs")}>Show All Jobs</button>

      </div>
      {message && <p className="error">{message}</p>}

      <div className="jobs-container">
        {jobs.map((job, idx) => (
          <JobCard key={idx} job={job} />
        ))}
      </div>
    </div>
  )
}


