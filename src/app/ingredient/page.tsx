"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import Image from "next/image"
import { getRecipesFromIngredients } from "../../../utils/getRecipesFromIngredients";
import { getCarbonFootprint } from "../../../utils/getCarbonFromIngredients";

interface Ingredient {
  name: string
  co2: string
  calories: string
}

// Define the Recipe interface
interface Recipe {
  node: {
    name: string;
    ingredients: Ingredient[];
    ingredientLines: string[];
  };
  carbonFootprints?: number[];
}

export default function IngredientPage() {
  const router = useRouter()

  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [newIngredient, setNewIngredient] = useState("")
  const [recipes, setRecipes] = useState<Recipe[]>([])

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, { name: newIngredient, co2: "0.12", calories: "5" }])
      setNewIngredient("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddIngredient()
    }
  }

  const handleFindRecipes = async () => {
    if (ingredients.length === 0) {
      alert("Please add at least one ingredient.");
      return;
    }

    try {
      const ingredientNames = ingredients.map((ing: Ingredient) => ing.name); // Convert ingredients list to an array of names for API request
      const response = await getRecipesFromIngredients(ingredientNames);
      if (response?.searchRecipesByIngredients?.edges) {
        const recipesWithCarbonFootprints = await Promise.all(
          response.searchRecipesByIngredients.edges.map(async (recipe: Recipe) => {
            const ingredientNames = recipe.node.ingredients.map((ing: Ingredient) => ing.name);
            const carbonFootprints = await Promise.all(
              ingredientNames.map(async (ingredient: string) => {
                const footprint = await getCarbonFootprint(ingredient);
                return footprint;
              })
            );
            return {
              ...recipe,
              carbonFootprints,
            };
          })
        );
        setRecipes(recipesWithCarbonFootprints);
      } else {
        console.error("Unexpected response format:", response)
      }
    } catch (error) {
      console.error("Error fetching recipes:", error)
    }
  }

  return (
    <div className="min-h-screen bg-[#98c9a3] flex flex-col items-center py-12 px-4">
      <h1 className="text-[#132a13] text-4xl md:text-5xl font-bold mb-8">Add Your Ingredients</h1>

      <div className="w-full max-w-3xl flex mb-6">
        <div className="flex w-full border-2 border-[#132a13] rounded-xl overflow-hidden">
          <input
            type="text"
            placeholder="Add your ingredient"
            className="flex-grow bg-[#dde7c7] px-4 py-3 text-xl placeholder-[#b5b5b5] outline-none"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleAddIngredient}
            className="bg-[#dde7c7] px-4 flex items-center justify-center border-l-2 border-[#132a13]"
          >
            <Plus size={32} className="text-[#000000]" />
          </button>
        </div>
      </div>

      {/* Ingredients list */}
      <div className="w-full max-w-4xl bg-[#dde7c7] rounded-3xl p-6 mb-8 max-h-[500px] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="bg-[#bfd8bd] rounded-xl overflow-hidden h-[400px] flex flex-col">
              <div className="p-2 border-b border-[#98c9a3] text-left">
                <h3 className="text-2xl text-[#132a13]">{ingredient.name}</h3>
              </div>
              <div className="p-4 flex flex-col items-center justify-center">
                <div className="w-28 h-28 relative mb-2">
                  <Image src="/meal.png" layout="fill" objectFit="contain" alt="meal" />
                </div>
                <div className="flex items-baseline justify-center space-x-1">
                  <p className="text-3xl font-bold text-[#29bf12]">{ingredient.co2}</p>
                  <p className="text-l text-[#132a13]">kg CO2e/kg</p>
                </div>
                <div className="text-center">
                  <p className="text-l text-[#132a13]">{ingredient.calories} cal/100g</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recipe list */}
      {recipes.length > 0 && (
        <div className="w-full max-w-4xl bg-[#dde7c7] rounded-3xl p-6 mb-8">
          <h2 className="text-[#132a13] text-3xl font-bold mb-6">Recommended Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recipes.map((recipe, index) => (
              <div key={index} className="bg-[#bfd8bd] rounded-xl overflow-hidden p-4">
                <h3 className="text-2xl text-[#132a13]">{recipe.node.name}</h3>
                <p className="text-[#132a13]">Ingredients: {recipe.node.ingredients.map((ing: Ingredient) => ing.name).join(", ")}</p>
                <p className="text-[#132a13]">{recipe.node.ingredientLines.join(", ")}</p>
                <p>Carbon Footprints (kg CO2 per kg): {recipe.carbonFootprints ? recipe.carbonFootprints.join(", ") : "N/A"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <button
        className="bg-[#100f0f] text-[#ffffff] text-xl font-semibold py-4 px-8 rounded-full mb-4"
        onClick={handleFindRecipes}
      >
        Find the Best Recipe Mix
      </button>

      {/*<button*/}
      {/*  className="bg-[#100f0f] text-[#ffffff] text-xl font-semibold py-4 px-8 rounded-full"*/}
      {/*  onClick={() => router.push("/recipes")}*/}
      {/*>*/}
      {/*  Go to Recipes Page*/}
      {/*</button>*/}
    </div>
  )
}