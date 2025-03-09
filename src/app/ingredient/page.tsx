"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"
import Image from "next/image"

export default function IngredientPage() {
  const [ingredients, setIngredients] = useState([
    { name: "apple", co2: "0.12", calories: "5" },
    { name: "apple", co2: "0.12", calories: "5" },
    { name: "apple", co2: "0.12", calories: "5" },
  ])
  const [newIngredient, setNewIngredient] = useState("")

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

      <div className="w-full max-w-4xl bg-[#dde7c7] rounded-3xl p-6 mb-8 max-h-[500px] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="bg-[#bfd8bd] rounded-xl overflow-hidden h-[400px] flex flex-col">
              <div className="p-2 border-b border-[#98c9a3] text-left">
                <h3 className="text-2xl text-[#132a13]">{ingredient.name}</h3>
              </div>
              <div className="p-4 flex flex-col items-center justify-center">
                <div className="w-28 h-28 relative mb-2">
                    <Image src="/meal.png" layout="fill" objectFit="contain" />
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

      <button className="bg-[#100f0f] text-[#ffffff] text-xl font-semibold py-4 px-8 rounded-full">
        Find the Best Recipe Mix
      </button>
    </div>
  )
}
