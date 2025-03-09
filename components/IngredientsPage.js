import React, { useState } from "react";
import "../styles/IngredientsPage.css";
import "../styles/generateButton.css";
import { getRecipesFromIngredients } from "../components/getRecipesFromIngredients";
const IngredientsPage = () => {
    const [ingredients, setIngeredients] = useState([]);
    const [input, setInput] = useState("");
    const [recipes, setRecipes] = useState([]);


    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key == "Enter" && input.trim() !== "") {
            setIngeredients([input.trim(), ...ingredients, ]);
            setInput("");
        }
    };

    const handleSaveClick = async () => {
        try {
            const response = await getRecipesFromIngredients(ingredients);
            if (response && response.searchRecipesByIngredients && response.searchRecipesByIngredients.edges) {
                const recipes = response.searchRecipesByIngredients.edges; // Extract the edges array
                setRecipes(recipes); // Set the fetched recipes to state
                console.log(recipes);
            } else {
                console.error("Unexpected response format:", response);
            }
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
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
                        <img src={"/red-apple-transparent-png.webp"} alt="apple" style={{ width: '30px', height: '30px' }}/>
                        <div className="card-top">
                            {ingredient}
                        </div>
                    </div>
                </div>
            ))}
          </section>
          <button className="button" onClick={handleSaveClick}>
          <section className="recipes-section">
                {recipes.map((recipe, index) => (
                    <div key={index} className="recipe-card">
                        <h2>{recipe.node.name}</h2>
                        <p>Ingredients: {recipe.node.ingredients.map(ing => ing.name).join(", ")}</p>
                        <p>{recipe.node.ingredientLines.join(", ")}</p>
                    </div>
                ))}
            </section>
          <div className="shadow"></div>
                <div className="edge"></div>
                <div className="front">
                    <span>Generate</span>
                </div>
                </button>
        </div>
    );
};

export default IngredientsPage;
