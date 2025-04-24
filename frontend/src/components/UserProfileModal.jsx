import React from 'react';
import '../styles/UserProfileModal.css';

const UserProfileModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <h2>User Info</h2>
        <ul className="profile-list">
          <li><strong>Name:</strong> {user.name}</li>
          <li><strong>Email:</strong> {user.email}</li>
          <li><strong>Username:</strong> {user.username || "N/A"}</li>
          <li><strong>Role:</strong> {user.role || "Student"}</li>
        </ul>
        <button className="close-profile-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserProfileModal;
