"use client";

import Image from "next/image";
import { ArrowLeft, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getRecipesFromIngredients } from "../../../utils/getRecipesFromIngredients";
import { getCarbonFootprint } from "../../../utils/getCarbonFromIngredients";

export default function RecipesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [recipes, setRecipes] = useState<any[]>([]);
    const [ingredients, setIngredients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        // const queryData = searchParams.get("ingredients");
        const storedIngredients = localStorage.getItem("selectedIngredients");

        if (!storedIngredients) {
            console.error("⚠ No ingredients received, cannot fetch recipes.");
            setIsLoading(false);
            return;
        }

        const ingredientList = JSON.parse(storedIngredients);
        setIngredients(ingredientList);

        // let ingredientNames = [];
        const ingredientNames = ingredientList.map((ing: any) => ing.name);
        const data = await getRecipesFromIngredients(ingredientNames);

        if (data?.searchRecipesByIngredients?.edges) {
          const recipeWithCarbon = await Promise.all(
              data.searchRecipesByIngredients.edges.map(async (edge) => {
                const recipe = edge.node;

                const carbonFootprint = await Promise.all(
                    recipe.ingredients.map(async (ing: any) => {
                      const footprint = await getCarbonFootprint(ing.name);
                      return footprint || 0;
                    })
                );
                const totalCarbonFootprint = carbonFootprint.reduce((sum, footprint) => sum + footprint, 0);

                return {
                  ...recipe,
                  totalCarbonFootprint,
                };
              })
          );
          setRecipes(recipeWithCarbon);
        } else {
            console.error("Unexpected data format: ", data);
        }
      } catch (error) {
        console.error("❌ Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-primary p-6">
      <header className="flex items-center justify-start mb-8">
        <button onClick={() => router.push("/ingredient")} className="pl-3">
          <ArrowLeft size={55} strokeWidth={5} className="text-dark" />
        </button>
        <h1 className="text-dark text-5xl font-bold ml-4">Recipes</h1>
      </header>

      <div className="h-[calc(100vh-140px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray scrollbar-track-transparent">
        <div className="space-y-4 pb-4">
          {isLoading ? (
            <p className="text-center text-gray-600 text-xl">Loading recipes...</p>
          ) : recipes.length === 0 ? (
            <p className="text-center text-gray-600 text-xl">No Recipe!</p>
          ) : (
            recipes.map((recipe: any, index: number) => (
              <div key={index} className="bg-secondary rounded-xl p-4 flex items-center">
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
                  <p className="text-dark text-xl mt-1">
                    Ingredients: {recipe.ingredients.map((ing: any) => ing.name).join(", ")}
                  </p>
                  <p className="text-dark text-xl font-semibold mt-1">
                    🌱 Total Carbon:
                    <span className="text-green-600 text-2xl font-bold"> {recipe.totalCarbonFootprint.toFixed(2)} </span>
                    <span className="text-dark text-lg"> kg CO2e/kg</span>
                  </p>
                </div>
                <button
                    onClick={() => {
                      const encodedData = encodeURIComponent(JSON.stringify(recipe));
                      router.push(`/recipes/${index}?data=${encodedData}`);
                    }}
                  className="ml-auto mr-4 p-2 rounded-full hover:bg-gray-200"
                >
                  <Search size={48} className="text-dark" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}