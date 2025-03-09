"use client";

import Image from "next/image"
import { ArrowLeft, Search } from "lucide-react"
// TODO: change to before page
import { useRouter } from "next/navigation";

export default function RecipesPage() {
  const router = useRouter(); // TODO: change to before page
  // Sample data to demonstrate scrolling
  // TODO: Replace with real data
  const recipes = [
    { id: 1, name: "Apple pie", ingredient: "apple", co2: "3.50" },
    { id: 2, name: "Apple pie", ingredient: "apple", co2: "3.50" },
    { id: 3, name: "Apple pie", ingredient: "apple", co2: "3.50" },
    { id: 4, name: "Apple pie", ingredient: "apple", co2: "3.50" },
    { id: 5, name: "Apple pie", ingredient: "apple", co2: "3.50" },
    { id: 6, name: "Apple pie", ingredient: "apple", co2: "3.50" },
  ]

  return (
    <div className="min-h-screen bg-primary p-6">
      <header className="flex items-center justify-center relative mb-8">
        <button className="absolute left-0 mr-4">
          <ArrowLeft size={48} className="text-dark" />
        </button>
        <h1 className="text-dark text-5xl font-bold">Recipes</h1>
      </header>

      <div className="h-[calc(100vh-140px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray scrollbar-track-transparent">
        <div className="space-y-4 pb-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-secondary rounded-xl p-4 flex items-center">
              <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/ApplePie.png?height=128&width=128"
                  alt="Apple pie illustration"
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
                <p className="text-dark text-xl mt-1">My Ingredient: {recipe.ingredient}</p>
              </div>
              <div className="ml-auto">
                <Search size={48} className="text-dark" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

