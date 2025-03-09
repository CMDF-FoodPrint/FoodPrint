"use client";
require('dotenv').config();
import { useState } from "react";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setRecipes([]);

    const response = await fetch("/api/recipes/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: ingredients.split(",") }),
    });

    const data = await response.json();
    setRecipes(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Low-Carbon Recipe Finder</h1>

      <input
        type="text"
        className="border p-2 rounded w-full mb-4"
        placeholder="Enter ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleSearch}
      >
        {loading ? "Loading..." : "Search Recipes"}
      </button>

      <ul className="mt-6 space-y-4">
        {recipes.map((recipe, index) => (
          <li key={index} className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold">{recipe.name}</h2>
            <p className="text-gray-700">
              Carbon Footprint: {recipe.carbonFootprint.toFixed(2)} kg CO2
            </p>
            <ul className="text-gray-600 mt-2">
              {recipe.ingredientLines.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
