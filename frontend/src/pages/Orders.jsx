import { useEffect, useState } from "react";
import API from "../services/api";
import Meals from "./Meals";

const Orders = () => {
  const [meals, setMeals] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [message, setMessage] = useState("");

  const fetchMeals = async () => {
    const res = await API.get("/meals");
    setMeals(res.data);
  };

  const fetchOrders = async () => {
    const res = await API.get("/orders");
    setOrders(res.data);
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      await API.post("/orders", {
        meals: [selectedMeal],
        scheduledTime: pickupTime,
      });
      setSelectedMeal("");
      setPickupTime("");
      setMessage("Order placed successfully!");
      fetchOrders();
    } catch (err) {
      setMessage("Failed to place order.");
    }
  };

  useEffect(() => {
    fetchMeals();
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-blue-800">🛒 Order a Meal</h1>

        {/* Order Form */}
        <form
          onSubmit={handleOrder}
          className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl space-y-4"
        >
          {message && <p className="text-blue-600 font-medium">{message}</p>}

          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedMeal}
            onChange={(e) => setSelectedMeal(e.target.value)}
            required
          >
            <option value="">Select a meal</option>
            {meals.map((meal) => (
              <option key={meal._id} value={meal._id}>
                {meal.name} – {meal.calories} kcal
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Place Order
          </button>
        </form>

        {/* Order List */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📋 Your Orders
          </h2>
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order._id}
                className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow space-y-1"
              >
                <p className="text-lg text-gray-800">
                  <strong>Meal:</strong>{" "}
                  {order.meals && order.meals.length > 0
                    ? order.meals.map((meal) => meal.name).join(", ")
                    : "Meal not available"}
                </p>
                <p>
                  <strong>Scheduled:</strong>{" "}
                  <span className="text-gray-700">
                    {new Date(order.scheduledTime).toLocaleString()}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Ordered: {new Date(order.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Orders;
