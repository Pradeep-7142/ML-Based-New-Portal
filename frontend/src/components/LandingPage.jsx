import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import Login from './Login';
import Signup from './Signup';
import UserProfileModal from './UserProfileModal'; // NEW IMPORT
import logoImage from '../assets/education.jpg';
import userImage from '../assets/user.avif';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false); // NEW STATE

  const handleLoginSuccess = (userData) => {
    setShowLogin(false);
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleSignupSuccess = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const handleDashboard = () => {
    navigate('/dashboard', { state: { user: currentUser } });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="left-section">
          <img src={logoImage} alt="Logo" className="logo-image" />
        </div>

        <div className="center-section">
          <h1 className="website-title">InfoSphere</h1>
        </div>

        <div className="right-section">
          <img
            src={userImage}
            alt="User"
            className="user-image"
            onClick={() => currentUser && setShowProfile(true)} // TRIGGER MODAL
            style={{ cursor: currentUser ? 'pointer' : 'default' }}
          />
          {!currentUser ? (
            <>
              <button onClick={() => setShowLogin(true)} className="btn">Login</button>
              <button onClick={() => setShowSignup(true)} className="btn">Sign Up</button>
            </>
          ) : (
            <>
              <button onClick={handleLogout} className="btn">Logout</button>
              <button onClick={handleDashboard} className="btn">See Recommended Jobs</button>
            </>
          )}
        </div>
      </header>

      {showLogin && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowLogin(false)}>
              &times;
            </button>
            <Login onLogin={handleLoginSuccess} />
          </div>
        </div>
      )}

      {showSignup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowSignup(false)}>
              &times;
            </button>
            <Signup onSignup={handleSignupSuccess} />
          </div>
        </div>
      )}

      {showProfile && (
        <UserProfileModal user={currentUser} onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
};

export default LandingPage;
