import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Auth.css';

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profession: '',
    college: '',
    year_of_study: '',
    branch: '',
    skills: '',
    interests: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/signup', formData);

      if (response.data.success) {
        setSuccess('Account created successfully. Please login.');
        setTimeout(() => {
          onSignup(); // This will close the signup modal and open login
        }, 1500);
      } else {
        setError(response.data.error || 'Something went wrong');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Server error');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <p className="error full-width">{error}</p>}
      {success && <p className="success full-width">{success}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className="form-group">
          <label>Profession</label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>College</label>
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Year of Study</label>
          <input
            type="number"
            name="year_of_study"
            value={formData.year_of_study}
            onChange={handleChange}
            min="1"
            max="4"
          />
        </div>
        <div className="form-group">
          <label>Branch</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
          />
        </div>
        <div className="form-group full-width">
          <label>Skills (comma separated)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
            placeholder="e.g., python, javascript, react"
          />
        </div>
        <div className="form-group full-width">
          <label>Interests (comma separated)</label>
          <input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            required
            placeholder="e.g., web development, AI, databases"
          />
        </div>
        <div className="form-group full-width">
          <button type="submit" className="auth-btn">Sign Up</button>
        </div>
      </form>
      <p className="full-width">
        Already have an account?{' '}
        <span onClick={() => {
          onSignup(); // Close signup
          // The parent component will handle opening login
        }} className="toggle-auth">
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;