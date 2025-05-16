import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-3xl text-center space-y-6 p-6">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700">Smart Food & Facility Manager</h1>
        <p className="text-lg text-gray-700">
          Streamline food service, reduce waste, and improve health through smart ordering and tracking.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
          <Link to="/meals" className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700 transition">
            View Meals
          </Link>
          <Link to="/orders" className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition">
            Place Order
          </Link>
          <Link to="/waste-logs" className="bg-red-600 text-white px-6 py-3 rounded shadow hover:bg-red-700 transition">
            Waste Logs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
