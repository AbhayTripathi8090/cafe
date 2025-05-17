import { useEffect, useState } from "react";
import API from "../services/api";

const WasteLogs = () => {
  const [meals, setMeals] = useState([]);
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({ item: "", quantity: "", reason: "" });
  const [message, setMessage] = useState("");

  const fetchMeals = async () => {
    const res = await API.get("/meals");
    setMeals(res.data);
  };

  const fetchLogs = async () => {
    const res = await API.get("/waste");
    setLogs(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/waste", form);
      setMessage("Logged successfully!");
      setForm({ item: "", quantity: "", reason: "" });
      fetchLogs();
    } catch (err) {
      setMessage("Failed to log waste");
    }
  };

  useEffect(() => {
    fetchMeals();
    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-red-700">♻️ Waste Logs</h1>

        {/* Waste Logging Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl space-y-6"
        >
          {message && <p className="text-red-600 font-medium">{message}</p>}

          <select
            name="item"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={form.item}
            onChange={(e) => setForm({ ...form, item: e.target.value })}
            required
          >
            <option value="">Select Meal</option>
            {meals.map((meal) => (
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
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <textarea
            name="reason"
            placeholder="Additional notes or reason (optional)"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-y"
            rows={4}
          />

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Log Waste
          </button>
        </form>

        {/* Past Logs List */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📜 Past Logs
          </h2>
          <ul className="space-y-4">
            {logs.map((log) => (
              <li
                key={log._id}
                className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow space-y-1"
              >
                <p className="text-lg text-gray-800">
                  <strong>Meal:</strong> {log.item?.name || "Unknown"}
                </p>
                <p>
                  <strong>Quantity:</strong> {log.quantity}
                </p>
                <p>
                  <strong>Reason:</strong> {log.reason || "—"}
                </p>
                <p className="text-sm text-gray-500">
                  Logged: {new Date(log.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WasteLogs;
