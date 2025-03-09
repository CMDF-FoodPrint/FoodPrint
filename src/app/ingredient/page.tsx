"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { getRecipesFromIngredients } from "../../../utils/getRecipesFromIngredients";
import { getCarbonFootprint } from "../../../utils/getCarbonFromIngredients";

interface Ingredient {
  name: string;
  co2: string;
  calories: string;
}

export default function IngredientPage() {
  const router = useRouter();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);

  const handleAddIngredient = async () => {
    if (newIngredient.trim()) {
      try {
        const footprint = await getCarbonFootprint(newIngredient);
        setIngredients([...ingredients, { name: newIngredient, co2: footprint?.toFixed(2) || "0.00", calories: "5" }]);
        setNewIngredient("");
      } catch (error) {
        console.error("Error fetching carbon footprint:", error);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddIngredient();
    }
  };

  const handleFindRecipes = () => {
    if (ingredients.length === 0) {
      alert("Please add at least one ingredient.");
      return;
    }
    localStorage.setItem("selectedIngredients", JSON.stringify(ingredients));
    router.push("/recipes");
  };

  return (
    <>
      <header className="w-full py-4 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Leaf className="h-6 w-6 text-green-800" />
          </Link>
          <Link href="/">
            <span className="font-bold text-xl text-green-800">FoodPrint</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/About" className="text-green-800 hover:text-green-900 font-medium">About</Link>
          <Link href="/ingredient" className="text-green-800 hover:text-green-900 font-medium">Recipes</Link>
          <Link href="/blog" className="text-green-800 hover:text-green-900 font-medium">Blog</Link>
          <Link href="#" className="text-green-800 hover:text-green-900 font-medium">Contact</Link>
        </nav>
      </header>

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

        {recipes.length > 0 && (
          <div className="w-full max-w-4xl bg-[#dde7c7] rounded-3xl p-6 mb-8">
            <h2 className="text-[#132a13] text-3xl font-bold mb-6">Recommended Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recipes.map((recipe, index) => (
                <div key={index} className="bg-[#bfd8bd] rounded-xl overflow-hidden p-4">
                  <h3 className="text-2xl text-[#132a13]">{recipe.node.name}</h3>
                  <p className="text-[#132a13]">Ingredients: {recipe.node.ingredients.map((ing: Ingredient) => ing.name).join(", ")}</p>
                  <p className="text-[#132a13]">{recipe.node.ingredientLines.join(", ")}</p>
                  <p>Total Carbon Footprint (kg CO2): {recipe.totalCarbonFootprint?.toFixed(2) || "N/A"}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <button className="bg-[#100f0f] text-[#ffffff] text-xl font-semibold py-4 px-8 rounded-full mb-4" onClick={handleFindRecipes}>
          Find the Best Recipe Mix
        </button>
      </div>
    </>
  );
}
