import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center space-y-8 p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 leading-tight tracking-tight">
          Smart Food & Facility Manager
        </h1>

        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Streamline food service, reduce waste, and improve health through
          smart ordering and real-time tracking.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link
            to="/meals"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-300"
          >
            🍱 View Meals
          </Link>
          <Link
            to="/orders"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-300"
          >
            🛒 Place Order
          </Link>
          <Link
            to="/waste"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-300"
          >
            ♻️ Waste Logs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
