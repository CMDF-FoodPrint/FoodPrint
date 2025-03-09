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
    // 🔍 쿼리 스트링에서 데이터 가져오기
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
    <div className="min-h-screen bg-primary">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10 bg-primary p-6 shadow-sm">
        <div className="flex items-center">
          <Link href="/recipes" className="mr-4">
            <ArrowLeft size={55} strokeWidth={5} className="text-dark" />
          </Link>
          <h1 className="text-dark text-4xl font-bold drop-shadow-md">Let's get Cooking!</h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="p-6 pb-24">
        {/* Recipe Card */}
        <div className="bg-card rounded-3xl p-8 shadow-md">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side with title and image */}
            <div className="flex flex-col items-center">
              <h2 className="text-black text-5xl font-bold mb-6">{recipe.name}</h2>
              <Image src="/meal.png" alt="recipe illustration" width={220} height={220} />
            </div>

            {/* Right side with ingredients and steps */}
            <div className="flex-1">
              <h3 className="text-black text-4xl font-medium mb-4">Ingredients</h3>
              <div className="text-black text-2xl mb-8 space-y-2">
                {recipe.ingredientLines.map((ingredient: string, index: number) => (
                  <p key={index}>{ingredient}</p>
                ))}
              </div>

              {recipe.steps && recipe.steps.length > 0 ? (
                <>
                  <h3 className="text-black text-4xl font-medium mb-4">Steps</h3>
                  <ol className="text-black text-2xl list-decimal pl-8 space-y-4">
                    {recipe.steps.map((step: string, index: number) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </>
              ) : (
                <p className="text-black text-2xl">No steps provided</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}