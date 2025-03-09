import React, { useState, useEffect } from "react";
import { getRecipesFromIngredients } from "../utils/getRecipesFromIngredients";
import { getCarbonFootprint } from "../utils/getCarbonFootprint";

export async function getServerSideProps(context) {
  const { ingredients } = context.query;
  
  if (!ingredients) {
    return { 
      props: { 
        recipes: [], 
        error: 'No ingredients provided' 
      } 
    };
  }

  try {
    const response = await getRecipesFromIngredients(ingredients.split(','));
    
    if (!response || !response.searchRecipesByIngredients || !response.searchRecipesByIngredients.edges) {
      return { 
        props: { 
          recipes: [], 
          error: 'No recipes found' 
        } 
      };
    }

    const recipes = response.searchRecipesByIngredients.edges;

    // For each recipe, calculate the carbon footprint for each ingredient
    const recipesWithCarbonFootprints = await Promise.all(
      recipes.map(async (recipe) => {
        const ingredientNames = recipe.node.ingredients.map((ing) => ing.name);

        // Calculate carbon footprints for each ingredient
        const carbonFootprints = await Promise.all(
          ingredientNames.map(async (ingredient) => {
            const footprint = await getCarbonFootprint(ingredient); // Fetch carbon footprint using Groq
            return footprint; // Return the carbon footprint for each ingredient
          })
        );

        // Return the recipe along with its ingredients' carbon footprints
        return {
          ...recipe,
          carbonFootprints,
        };
      })
    );

    // Return recipes with their calculated carbon footprints as props
    return { 
      props: { 
        recipes: recipesWithCarbonFootprints,
        error: null
      }
    };

  } catch (error) {
    console.error("Error fetching recipes:", error);
    return { 
      props: { 
        recipes: [], 
        error: 'Failed to fetch data'
      }
    };
  }
}

const RecipePage = ({ recipes, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="recipe-container">
      <h1>Recipe Results</h1>
      {recipes.length === 0 ? (
        <p>No recipes available.</p>
      ) : (
        recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <h2>{recipe.node.name}</h2>
            <p>Ingredients: {recipe.node.ingredients.map(ing => ing.name).join(", ")}</p>
            <p>Ingredient Lines: {recipe.node.ingredientLines.join(", ")}</p>
            <p>Carbon Footprints (kg CO2 per kg): {recipe.carbonFootprints.join(", ")}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipePage;