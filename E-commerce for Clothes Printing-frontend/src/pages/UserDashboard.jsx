import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.fullName || user?.username}!</h1>
      <div className="user-info">
        <p><strong>Email:</strong> {user?.email}</p>
        {user?.mobileNumber && (
          <p><strong>Mobile:</strong> {user.mobileNumber}</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;