// import React, { useState } from "react";
// import JobCard from "./JobCard";
// import '../App.css';
// import '../styles.css';

// export default function AllJobs() {
//   const [jobs, setJobs] = useState([]);
//   const [message, setMessage] = useState("");

//   const fetchJobs = async (endpoint) => {
//     try {
//       const res = await fetch(`http://localhost:5000/${endpoint}`, {
//         credentials: "include",
//       });

//       const text = await res.text();
//       console.log("Raw response text:", text);

//       const data = JSON.parse(text);

//       if (res.ok) {
//         setJobs(data);
//         setMessage("");
//       } else {
//         setJobs([]);
//         setMessage(data.error || "Something went wrong.");
//       }
//     } catch (err) {
//       console.error("Error fetching jobs:", err);
//       setJobs([]);
//       setMessage("Error fetching jobs.");
//     }
//   };
//   return (
//     <div>
//       <div className="button-container">
//         <button onClick={() => fetchJobs("all-jobs")}>Show All Jobs</button>

//       </div>
//       {message && <p className="error">{message}</p>}

//       <div className="jobs-container">
//         {jobs.map((job, idx) => (
//           <JobCard key={idx} job={job} />
//         ))}
//       </div>
//     </div>
//   )
// }

import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import '../App.css';
import '../styles.css';

export default function AllJobs() {
  const [allJobs, setAllJobs] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/all-jobs", {
        credentials: "include",
      });

      const text = await res.text();
      console.log("Raw response text:", text);

      const data = JSON.parse(text);

      if (res.ok) {
        setAllJobs(data);
        setVisibleJobs(data.slice(0, 10));
        setMessage("");
      } else {
        setAllJobs([]);
        setVisibleJobs([]);
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setAllJobs([]);
      setVisibleJobs([]);
      setMessage("Error fetching jobs.");
    }
  };

  useEffect(() => {
    fetchJobs(); // Load jobs on component mount
  }, []);

  const handleSeeMore = () => {
    const nextCount = visibleCount + 10;
    setVisibleJobs(allJobs.slice(0, nextCount));
    setVisibleCount(nextCount);
  };

  return (
    <div>
      {message && <p className="error">{message}</p>}

      <div className="jobs-container">
        {visibleJobs.map((job, idx) => (
          <JobCard key={idx} job={job} />
        ))}
      </div>

      {visibleCount < allJobs.length && (
        <div className="button-container">
          <button onClick={handleSeeMore}>See More</button>
        </div>
      )}
    </div>
  );
}

