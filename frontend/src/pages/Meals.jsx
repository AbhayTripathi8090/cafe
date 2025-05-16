import { useEffect, useState } from "react";
import API from "../services/api";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [form, setForm] = useState({ name: "", calories: "", tags: "" });
  const [error, setError] = useState("");

  const getMeals = async () => {
    try {
      const res = await API.get("/meals");
      setMeals(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createMeal = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        calories: form.calories,
        tags: form.tags.split(",").map((tag) => tag.trim()),
      };
      await API.post("/meals", payload);
      setForm({ name: "", calories: "", tags: "" });
      getMeals();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add meal");
    }
  };

  const deleteMeal = async (id) => {
    try {
      await API.delete(`/meals/${id}`);
      getMeals();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    getMeals();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Meals</h1>

      <form
        onSubmit={createMeal}
        className="bg-white p-4 rounded shadow space-y-2 mb-6"
      >
        <h2 className="text-xl font-semibold">Add New Meal</h2>
        {error && <p className="text-red-600">{error}</p>}
        <input
          name="name"
          placeholder="Meal Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="calories"
          type="number"
          placeholder="Calories"
          value={form.calories}
          onChange={(e) => setForm({ ...form, calories: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="tags"
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button className="bg-green-600 text-white p-2 px-4 rounded">
          Add Meal
        </button>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {meals.map((meal) => (
          <div key={meal._id} className="p-4 bg-white rounded shadow space-y-2">
            <h3 className="text-xl font-semibold">{meal.name}</h3>
            <p>{meal.calories} kcal</p>
            <p className="text-sm text-gray-500">
              {Array.isArray(meal.tags) ? meal.tags.join(", ") : "No tags"}
            </p>{" "}
            <button
              onClick={() => deleteMeal(meal._id)}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meals;
