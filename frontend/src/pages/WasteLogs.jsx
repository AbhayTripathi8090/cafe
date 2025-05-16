import { useEffect, useState } from 'react';
import API from '../services/api';

const WasteLogs = () => {
  const [meals, setMeals] = useState([]);
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({ mealId: '', quantity: '', notes: '' });
  const [message, setMessage] = useState('');

  const fetchMeals = async () => {
    const res = await API.get('/meals');
    setMeals(res.data);
  };

  const fetchLogs = async () => {
    const res = await API.get('/waste-logs');
    setLogs(res.data);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/waste-logs', form);
      setMessage('Logged successfully!');
      setForm({ mealId: '', quantity: '', notes: '' });
      fetchLogs();
    } catch (err) {
      setMessage('Failed to log waste');
    }
  };

  useEffect(() => {
    fetchMeals();
    fetchLogs();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Waste Logs</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4 mb-6">
        {message && <p className="text-blue-600">{message}</p>}

        <select
          name="mealId"
          className="w-full p-2 border rounded"
          value={form.mealId}
          onChange={e => setForm({ ...form, mealId: e.target.value })}
          required
        >
          <option value="">Select Meal</option>
          {meals.map(meal => (
            <option key={meal._id} value={meal._id}>
              {meal.name}
            </option>
          ))}
        </select>

        <input
          name="quantity"
          type="number"
          placeholder="Quantity (in units or grams)"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="notes"
          placeholder="Additional notes (optional)"
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <button className="bg-red-600 text-white px-4 py-2 rounded">Log Waste</button>
      </form>

      <h2 className="text-2xl font-semibold mb-2">Past Logs</h2>
      <ul className="space-y-2">
        {logs.map(log => (
          <li key={log._id} className="bg-gray-100 p-3 rounded">
            <p><strong>Meal:</strong> {log.meal.name}</p>
            <p><strong>Quantity:</strong> {log.quantity}</p>
            <p><strong>Notes:</strong> {log.notes || '—'}</p>
            <p className="text-sm text-gray-500">
              Logged: {new Date(log.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WasteLogs;
