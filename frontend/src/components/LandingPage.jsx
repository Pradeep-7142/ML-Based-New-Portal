import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import Login from './Login';
import Signup from './Signup';


const LandingPage = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setShowLogin(false);
    setCurrentUser(userData);
    // Store user in localStorage to persist across page refreshes
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

  // Check for logged-in user on initial render
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to Our Platform</h1>
        <div className="auth-buttons">
          {!currentUser ? (
            <>
              <button onClick={() => setShowLogin(true)} className="btn login-btn">Login</button>
              <button onClick={() => setShowSignup(true)} className="btn signup-btn">Sign Up</button>
            </>
          ) : (
            <>
              <button onClick={handleDashboard} className="btn dashboard-btn">
                See Recommended Jobs
              </button>
              <button onClick={handleLogout} className="btn logout-btn">Logout</button>
            </>
          )}
        </div>
        
      </header>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="close-button" 
              onClick={() => setShowLogin(false)}
            >
              &times;
            </button>
            <Login onLogin={handleLoginSuccess} />
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="close-button" 
              onClick={() => setShowSignup(false)}
            >
              &times;
            </button>
            <Signup onSignup={handleSignupSuccess} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;