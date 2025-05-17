import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Meals from './Meals';
import WasteLogs from './WasteLogs';
// import { useAuth } from '../context/AuthContext';

// src/pages/AdminDashboard.jsx
const AdminDashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, Admin! Here you can manage meals, users, orders, etc.</p>
      {/* Add links or components to manage meals, view waste logs, etc. */}
      <Meals/>
      

    </div>
  );
};

export default AdminDashboard;

