
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Correct named import

import Home from "./pages/Home.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Meals from "./pages/Meals";
import Orders from "./pages/Orders";
import WasteLogs from "./pages/WasteLogs";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOnly from "./components/AdminOnly";
import NavbarAdmin from "./components/NavbarAdmin.jsx";
import NavbarUser from "./components/NavbarUser.jsx";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // ✅ Updated
        setIsAdmin(decoded.isAdmin === true);
      } catch {
        setIsAdmin(false);
      }
    }
  }, []);

  const handleLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // ✅ Updated
        setIsAdmin(decoded.isAdmin === true);
      } catch {
        setIsAdmin(false);
      }
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  return (
    <BrowserRouter>
      {isAdmin ? (
        <NavbarAdmin onLogout={handleLogout} />
      ) : (
        <NavbarUser onLogout={handleLogout} />
      )}
      <div className="bg-purple-900/60 backdrop-blur-md min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/waste" element={<WasteLogs />} />
          <Route
            path="/admin"
            element={
              <AdminOnly>
                <AdminDashboard />
              </AdminOnly>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
