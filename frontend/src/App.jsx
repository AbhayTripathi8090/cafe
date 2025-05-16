import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login';
import Register from './pages/Register';
import Meals from './pages/Meals';
import Orders from './pages/Orders';
import WasteLogs from './pages/WasteLogs';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/waste" element={<WasteLogs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
