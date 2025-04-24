import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import NewsList from "./components/NewsList";
import Footer from "./components/Footer";
import './styles/main.css';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // to get current path

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

  // Check if current path is NOT dashboard
  const showNewsAndFooter = location.pathname !== '/dashboard';

  return (
    <div className="app">
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      {showNewsAndFooter && (
        <>
          <NewsList />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
