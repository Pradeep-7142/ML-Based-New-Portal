// import Header from "./components/Header";
// import NewsList from "./components/NewsList";
// import Footer from "./components/Footer";
// import "./styles.css";
// import React, { useState } from "react";
// import JobCard from "./components/JobCard";
// import "./App.css";



// const App = () => {
//     const [jobs, setJobs] = useState([]);
//     const [message, setMessage] = useState("");
  
//     const fetchJobs = async (endpoint) => {
//       try {
//         const res = await fetch(`http://localhost:5000/${endpoint}`, {
//           credentials: "include",
//         });
  
//         const text = await res.text();
//         console.log("Raw response text:", text);
  
//         const data = JSON.parse(text);
  
//         if (res.ok) {
//           setJobs(data);
//           setMessage("");
//         } else {
//           setJobs([]);
//           setMessage(data.error || "Something went wrong.");
//         }
//       } catch (err) {
//         console.error("Error fetching jobs:", err);
//         setJobs([]);
//         setMessage("Error fetching jobs.");
//       }
//     };
  
//     return (
//       <div>
//         <Header />
//         <NewsList />
  
//         <h1>Job Portal</h1>
//         <div className="button-container">
//           <button onClick={() => fetchJobs("all-jobs")}>Show All Jobs</button>
//           <button onClick={() => fetchJobs("recommended-jobs")}>Show Recommended Jobs</button>
//         </div>
  
//         {message && <p className="error">{message}</p>}
  
//         <div className="jobs-container">
//           {jobs.map((job, idx) => (
//             <JobCard key={idx} job={job} />
//           ))}
//         </div>
  
//         <Footer />
//       </div>
//     );
//   };
  
//   export default App;

// import React, { useState, useEffect } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import Auth from './components/Auth';
// import Dashboard from './components/Dashboard';
// import Navbar from './components/Navbar';
// import './styles/main.css';

// function App() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if user is logged in (simple version without proper auth tokens)
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogin = (userData) => {
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//     navigate('/dashboard');
//   };

//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     navigate('/');
//   };

//   return (
//     <div className="app">
//       <Navbar user={user} onLogout={handleLogout} />
//       <Routes>
//         <Route path="/" element={<Auth onLogin={handleLogin} />} />
//         <Route path="/dashboard" element={<Dashboard user={user} />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import './styles/main.css';
import NewsList from "./components/NewsList";
import Footer from "./components/Footer";


function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="app">
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      
      <NewsList/>
      <Footer/>
    </div>
  );
}

export default App;



