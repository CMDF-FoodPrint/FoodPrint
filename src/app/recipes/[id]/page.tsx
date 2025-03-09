"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RecipeDetailPage() {
  const searchParams = useSearchParams();
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    const queryData = searchParams.get("data");

    if (queryData) {
      try {
        const parsedRecipe = JSON.parse(decodeURIComponent(queryData));
        console.log("📥 Received Recipe Data:", parsedRecipe);
        setRecipe(parsedRecipe);
      } catch (error) {
        console.error("❌ Error parsing recipe data:", error);
      }
    }
  }, []);

  if (!recipe) return <p className="text-center text-red-600 text-xl">Recipe not found</p>;

  return (
    <div className="min-h-screen bg-[#dde7c7] p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <Link href="/recipes" className="flex items-center text-dark text-2xl font-medium mb-4">
          <ArrowLeft size={40} strokeWidth={3} className="mr-2" /> Back to Recipes
        </Link>
      </div>

      <h1 className="text-[#132a13] text-5xl font-bold text-center mb-6">{recipe.name}</h1>

      <Image src="/meal.png" alt="recipe illustration" width={250} height={250} className="mb-6" />

      <div className="w-full max-w-3xl bg-[#bfd8bd] p-6 rounded-xl shadow-lg">
        <h2 className="text-[#132a13] text-3xl font-semibold mb-4">Ingredients</h2>
        <ul className="text-[#132a13] text-xl list-disc pl-6 space-y-2">
          {recipe.ingredientLines.map((ingredient: string, index: number) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      {recipe.steps && recipe.steps.length > 0 && (
        <div className="w-full max-w-3xl bg-[#bfd8bd] p-6 rounded-xl shadow-lg mt-6">
          <h2 className="text-[#132a13] text-3xl font-semibold mb-4">Steps</h2>
          <ol className="text-[#132a13] text-xl list-decimal pl-6 space-y-2">
            {recipe.steps.map((step: string, index: number) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}