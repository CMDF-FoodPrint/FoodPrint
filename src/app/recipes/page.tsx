"use client";

import Image from "next/image"
import { ArrowLeft, Search } from "lucide-react"
// TODO: change to before page
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RecipesPage() {
  const router = useRouter(); // TODO: change to before page
  const [recipes, setRecipes] = useState([]); // initialize state
  const [isLoading, setIsLoading] = useState(true);
  // function to fetch data
  useEffect(() => {
    async function fetchRecipes() {
      try {
        // fetch data from api endpoint
        const res = await fetch("https://api.example.com/recipes");
        if (!res.ok) throw new Error("Failed to fetch recipes");
        const data = await res.json();
        setRecipes(data);
        } catch (error) {
            console.error("Error fetching recipes: ", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  // mok data
  // const recipes = [
  //   { id: 1, name: "Apple pie", ingredient: "apple", co2: "3.50" },
  //   { id: 2, name: "Apple pie", ingredient: "apple", co2: "3.50" },
  //   { id: 3, name: "Apple pie", ingredient: "apple", co2: "3.50" },
  //   { id: 4, name: "Apple pie", ingredient: "apple", co2: "3.50" },
  //   { id: 5, name: "Apple pie", ingredient: "apple", co2: "3.50" },
  //   { id: 6, name: "Apple pie", ingredient: "apple", co2: "3.50" },
  // ]

  return (
    <div className="min-h-screen bg-primary p-6">
      <header className="flex items-center justify-center relative mb-8">
        {/* TODO: need to chage to before bage */}
        <button onClick={() => router.push("/")} className="absolute left-0 mr-4">
          <ArrowLeft size={48} className="text-dark" />
        </button>
        <h1 className="text-dark text-5xl font-bold">Recipes</h1>
      </header>

      <div className="h-[calc(100vh-140px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray scrollbar-track-transparent">
        <div className="space-y-4 pb-4">
          {isLoading ? (
            <p className="text-center text-gray-600 text-xl">Loading recipes...</p>
              ) : recipes.length === 0 ? (
            <p className="text-center text-gray-600 text-xl">No Recipe!</p>
              ) : (
            recipes.map((recipe: any) => (
            <div key={recipe.id} className="bg-secondary rounded-xl p-4 flex items-center">
              <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/meal.png"
                  alt="recipe illustration"
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </div>
              <div className="ml-4 flex-grow">
                <h2 className="text-dark text-4xl font-bold mb-2">{recipe.name}</h2>
                <div className="flex items-center">
                  <span className="text-dark text-xl">Total: </span>
                  <span className="text-accent text-xl font-medium ml-2">{recipe.co2}</span>
                  <span className="text-dark text-xl ml-2">kg CO2e/kg</span>
                </div>
                <p className="text-dark text-xl mt-1">
                  My Ingredient: {Array.isArray(recipe.ingredient) ? recipe.ingredient.join(", ") : recipe.ingredient}
                </p>
              </div>
              {/*TODO: need to change to detail page*/}
              {/*<button onClick={() => router.push(`/recipes/${recipe.id}`)}*/}
              <button onClick={() => router.push("/")} className="ml-auto mr-4 p-2 rounded-full hover:bg-gray-200">
                <Search size={48} className="text-dark" />
              </button>
            </div>
          ))
          )}
        </div>
      </div>
    </div>
  )
}

