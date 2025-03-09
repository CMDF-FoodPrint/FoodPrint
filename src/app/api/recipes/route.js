import { getRecipesByIngredients } from "../../../lib/suggestic";
import { getCarbonFootprint } from "../../../lib/groq";

export async function POST(req) {
  try {
    const { ingredients } = await req.json();

    // Fetch recipes from Suggestic
    const recipes = await getRecipesByIngredients(ingredients);

    const enrichedRecipes = await Promise.all(
      recipes.map(async (recipe) => {
        let totalCarbonFootprint = 0;

        for (const ingredient of recipe.ingredients) {
          const footprint = await getCarbonFootprint(ingredient);
          if (footprint) totalCarbonFootprint += footprint;
        }

        return { ...recipe, carbonFootprint: totalCarbonFootprint };
      })
    );

    // Sort by lowest carbon footprint
    return Response.json(
      enrichedRecipes.sort((a, b) => a.carbonFootprint - b.carbonFootprint)
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
