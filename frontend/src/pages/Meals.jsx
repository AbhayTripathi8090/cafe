// import { useEffect, useState } from "react";
// import API from "../services/api";

// const Meals = () => {
//   const [meals, setMeals] = useState([]);
//   const [form, setForm] = useState({ name: "", calories: "", tags: "" });
//   const [error, setError] = useState("");

//   const getMeals = async () => {
//     try {
//       const res = await API.get("/meals");
//       setMeals(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const createMeal = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         name: form.name,
//         calories: form.calories,
//         tags: form.ingredients.split(",").map((ingredients) => ingredients.trim()),
//       };
//       await API.post("/meals", payload);
//       setForm({ name: "", calories: "", ingredients: "" });
//       getMeals();
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to add meal");
//     }
//   };

//   const deleteMeal = async (id) => {
//     try {
//       await API.delete(`/meals/${id}`);
//       getMeals();
//     } catch (err) {
//       console.error("Delete failed", err);
//     }
//   };

//   useEffect(() => {
//     getMeals();
//   }, []);

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">Meals</h1>

//       <form
//         onSubmit={createMeal}
//         className="bg-white p-4 rounded shadow space-y-2 mb-6"
//       >
//         <h2 className="text-xl font-semibold">Add New Meal</h2>
//         {error && <p className="text-red-600">{error}</p>}
//         <input
//           name="name"
//           placeholder="Meal Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           name="calories"
//           type="number"
//           placeholder="Calories"
//           value={form.calories}
//           onChange={(e) => setForm({ ...form, calories: e.target.value })}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           name="tags"
//           placeholder="Tags (comma-separated)"
//           value={form.ingredients}
//           onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
//           className="w-full p-2 border rounded"
//         />
//         <button className="bg-green-600 text-white p-2 px-4 rounded">
//           Add Meal
//         </button>
//       </form>

//       <div className="grid md:grid-cols-2 gap-4">
//         {meals.map((meal) => (
//           <div key={meal._id} className="p-4 bg-white rounded shadow space-y-2">
//             <h3 className="text-xl font-semibold">{meal.name}</h3>
//             <p>{meal.calories} kcal</p>
//             <p className="text-sm text-gray-500">
//               {Array.isArray(meal.ingredients) && meal.ingredients.length > 0
//                 ? meal.ingredients.join(", ")
//                 : "No ingredients"}
//             </p>

//             <button
//               onClick={() => deleteMeal(meal._id)}
//               className="text-sm bg-red-500 text-white px-3 py-1 rounded"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Meals;
import { useEffect, useState } from "react";
import API from "../services/api";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [form, setForm] = useState({ name: "", calories: "", ingredients: "" });
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
        calories: Number(form.calories),
        ingredients: form.ingredients
          .split(",")
          .map((ingredient) => ingredient.trim())
          .filter((ing) => ing.length > 0),
      };
      await API.post("/meals", payload);
      setForm({ name: "", calories: "", ingredients: "" });
      setError("");
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-green-800">🍽️ Meals</h1>

        {/* Add New Meal Form */}
        <form
          onSubmit={createMeal}
          className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl space-y-4"
        >
          <h2 className="text-2xl font-semibold text-gray-800">
            ➕ Add New Meal
          </h2>
          {error && <p className="text-red-600 font-medium">{error}</p>}

          <input
            name="name"
            placeholder="Meal Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            name="calories"
            type="number"
            placeholder="Calories"
            value={form.calories}
            onChange={(e) => setForm({ ...form, calories: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            name="ingredients"
            placeholder="Ingredients (comma-separated)"
            value={form.ingredients}
            onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600/90 backdrop-blur-sm border border-green-500/70 hover:bg-green-700/90 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Add Meal
          </button>
        </form>

        {/* Meals List */}
        <div className="grid md:grid-cols-2 gap-6">
          {meals.map((meal) => (
            <div
              key={meal._id}
              className="p-5 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg space-y-2"
            >
              <h3 className="text-2xl font-semibold text-gray-800">
                {meal.name}
              </h3>
              <p className="text-green-700 font-medium">{meal.calories} kcal</p>
              <p className="text-sm text-gray-600">
                {Array.isArray(meal.ingredients) && meal.ingredients.length > 0
                  ? meal.ingredients.join(", ")
                  : "No ingredients"}
              </p>

              <button
                onClick={() => deleteMeal(meal._id)}
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Meals;
