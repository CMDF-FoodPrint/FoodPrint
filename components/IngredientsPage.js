/*import React, { useState } from "react";
import "../styles/IngredientsPage.css";
import "../styles/generateButton.css";
import { getRecipesFromIngredients } from "../utils/getRecipesFromIngredients";
import { getCarbonFootprint } from "../utils/getCarbonFromIngredients";

const IngredientsPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [input, setInput] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      setIngredients([input.trim(), ...ingredients]);
      setInput("");
    }
  };

  const handleGenerateClick = async () => {
    if (ingredients.length === 0) {
      setError("Please add at least one ingredient.");
      return;
    }

    setError("");
    setLoading(true);

  };

  return (
    <div className="ingredients-container">
      <h1>Fill your fridge</h1>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Enter an ingredient"
        className="input"
      />
      <section className="section">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="card">
            <div className="card-content">
              <img
                src={"/red-apple-transparent-png.webp"}
                alt="apple"
                style={{ width: "30px", height: "30px" }}
              />
              <div className="card-top">{ingredient}</div>
            </div>
          </div>
        ))}
      </section>
      <button className="button" onClick={handleGenerateClick} disabled={loading}>
        <span>{loading ? "Loading..." : "Generate"}</span>
      </button>

      {error && <div className="error">{error}</div>}

      {/* Display recipes }
      <section className="recipes-section">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <h2>{recipe.node.name}</h2>
              <p>Ingredients: {recipe.node.ingredients.map((ing) => ing.name).join(", ")}</p>
              <p>Instructions: {recipe.node.ingredientLines.join(", ")}</p>
              <p>Carbon Footprints (kg CO2 per kg): {recipe.carbonFootprints.join(", ")}</p>
              <p><strong>Total Carbon Footprint: 1 kg CO2</strong></p>

            </div>
          ))
        ) : (
          !loading && <p>No recipes to display.</p>
        )}
      </section>
    </div>
  );
}; */

//export default IngredientsPage;
