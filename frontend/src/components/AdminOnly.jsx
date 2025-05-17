// src/components/AdminOnly.jsx
import { Navigate } from 'react-router-dom';

const AdminOnly = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return isAdmin ? children : <Navigate to="/" replace />;
};

export default AdminOnly;
