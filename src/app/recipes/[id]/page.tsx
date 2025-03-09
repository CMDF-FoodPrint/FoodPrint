"use client";

import {useEffect, useState} from "react"
import Image from "next/image"
import Link from "next/link"
import {ArrowLeft} from "lucide-react"

export default function RecipeDetailPage({params}: { params: { id: string } }) {
    // mok data
    // TODO: change to real data
    // const recipe = {
    //   id: params.id,
    //   title: "Apple pie",
    //   ingredients: [
    //     "2 apples, flour 100g, sugar 100g",
    //     "1/2 tsp cinnamon",
    //     "1/4 tsp nutmeg",
    //     "50g butter, cold and cubed",
    //     "1 egg for egg wash",
    //     "1 tbsp lemon juice",
    //     "2 tbsp cornstarch",
    //     "1 tsp vanilla extract",
    //   ],
    //   steps: [
    //     "ipsum",
    //     "ipsum",
    //   ],
    // }

    const [recipe, setRecipe] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        // fetch data from api endpoint
        const res = await fetch(`https://api.example.com/recipes/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch recipe");
        const data = await res.json();
        setRecipe(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecipe();
  }, [params.id]);

    if (isLoading) return <p className="text-center text-gray-600 text-xl">Loading recipe...</p>
    if (error) return <p className="text-center text-red-600 text-xl">Error fetching recipe: {error}</p>
    if (!recipe) return <p className="text-center text-red-600 text-xl">Recipe not found</p>

    return (
        <div className="min-h-screen bg-primary">
            {/* Fixed Header */}
            <div className="sticky top-0 z-10 bg-primary p-6 shadow-sm">
                <div className="flex items-center">
                    <Link href="/recipes" className="mr-4">
                        <ArrowLeft size={55} strokeWidth={5} className="text-dark"/>
                    </Link>
                    <div className="flex items-center">
                        {/*<Image src="/greenleaf.png" alt="Leaf icon" width={40} height={40} className="mr-2" />*/}
                        <h1 className="text-dark text-4xl font-bold drop-shadow-md">Let's get Cooking!</h1>
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 pb-24">
                {/* Recipe Card */}
                <div className="bg-card rounded-3xl p-8 shadow-md">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Left side with title and image */}
                        <div className="flex flex-col items-center">
                            <h2 className="text-black text-5xl font-bold mb-6">{recipe.title}</h2>
                            <Image src="/meal.png" alt="recipe illustration" width={220} height={220}/>
                        </div>

                        {/* Right side with ingredients and steps */}
                        <div className="flex-1">
                            <h3 className="text-black text-4xl font-medium mb-4">Ingredient</h3>
                            <div className="text-black text-2xl mb-8 space-y-2">
                                {recipe.ingredients.map((ingredient, index) => (
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
    )
}