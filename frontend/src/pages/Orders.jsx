import { useEffect, useState } from 'react';
import API from '../services/api';

const Orders = () => {
  const [meals, setMeals] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [message, setMessage] = useState('');

  const fetchMeals = async () => {
    const res = await API.get('/meals');
    setMeals(res.data);
  };

  const fetchOrders = async () => {
    const res = await API.get('/orders');
    setOrders(res.data);
  };

  const handleOrder = async e => {
    e.preventDefault();
    try {
      await API.post('/orders', {
        mealId: selectedMeal,
        scheduledTime: pickupTime,
      });
      setSelectedMeal('');
      setPickupTime('');
      setMessage('Order placed successfully!');
      fetchOrders();
    } catch (err) {
      setMessage('Failed to place order.');
    }
  };

  useEffect(() => {
    fetchMeals();
    fetchOrders();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Order a Meal</h1>

      <form onSubmit={handleOrder} className="bg-white p-4 rounded shadow mb-6 space-y-4">
        {message && <p className="text-blue-600">{message}</p>}
        <select
          className="w-full p-2 border rounded"
          value={selectedMeal}
          onChange={e => setSelectedMeal(e.target.value)}
          required
        >
          <option value="">Select a meal</option>
          {meals.map(meal => (
            <option key={meal._id} value={meal._id}>
              {meal.name} – {meal.calories} kcal
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          className="w-full p-2 border rounded"
          value={pickupTime}
          onChange={e => setPickupTime(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Place Order</button>
      </form>

      <h2 className="text-2xl font-semibold mb-2">Your Orders</h2>
      <ul className="space-y-2">
        {orders.map(order => (
          <li key={order._id} className="bg-gray-100 p-3 rounded">
            <p>
              <strong>Meal:</strong> {order.meal?.name || 'Meal not available'}
            </p>
            <p>
              <strong>Scheduled:</strong>{' '}
              {new Date(order.scheduledTime).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">Ordered: {new Date(order.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
