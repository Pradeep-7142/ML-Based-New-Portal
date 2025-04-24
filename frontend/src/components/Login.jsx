import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Auth.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: formData.email,
        password: formData.password
      });
      
      if (response.data.success) {
        // Make sure the backend returns the complete user object
        onLogin(response.data.user);
      } else {
        setError(response.data.error || 'Something went wrong');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Server error');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="auth-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;