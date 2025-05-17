import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Meals from "./Meals";
import WasteLogs from "./WasteLogs";
// import { useAuth } from '../context/AuthContext';

// src/pages/AdminDashboard.jsx
const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-900">
  <div className="max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl space-y-6">
    <h1 className="text-4xl font-extrabold text-green-700">Admin Dashboard</h1>
    <p className="text-gray-700 text-lg">
      Welcome, Admin! Here you can manage meals, users, orders, etc.
    </p>

    {/* Add links or components to manage meals, view waste logs, etc. */}
    {/* <Meals /> */}
  </div>
</div>

  );
};

export default AdminDashboard;
