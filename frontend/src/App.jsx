import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login';
import Register from './pages/Register';
import Meals from './pages/Meals';
import Orders from './pages/Orders';
import WasteLogs from './pages/WasteLogs';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import AdminOnly from './components/AdminOnly';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="bg-purple-900/60 backdrop-blur-md min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/waste" element={<WasteLogs />} />
          {/* ✅ Admin route */}
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
