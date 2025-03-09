import { getRecipesFromIngredients } from "./getRecipesFromIngredients";
import { getCarbonFootprint } from "./getCarbonFromIngredients";

export async function getServerSideProps(context) {
  const { ingredients } = context.query; // Get ingredients from query string

  if (!ingredients) {
    return {
      props: {
        recipes: [],
        error: 'No ingredients provided'
      }
    };
  }

  try {
    // Get the recipes based on the ingredients provided
    const response = await getRecipesFromIngredients(ingredients.split(','));

    if (!response || !response.searchRecipesByIngredients || !response.searchRecipesByIngredients.edges) {
      return {
        props: {
          recipes: [],
          error: 'No recipes found'
        }
      };
    }

    const recipes = response.searchRecipesByIngredients.edges.slice(0, 10);

    // For each recipe, calculate the carbon footprint for each ingredient
    const recipesWithCarbonFootprints = await Promise.all(
      recipes.map(async (recipe) => {
        const ingredientNames = recipe.node.ingredients.map((ing) => ing.name);

        // Calculate carbon footprints for each ingredient
        const carbonFootprints = await Promise.all(
          ingredientNames.map(async (ingredient) => {
            const footprint = await getCarbonFootprint(ingredient); // Fetch carbon footprint using Groq
            return footprint;
            ;})
        );

        //const totalCarbonFootprint = carbonFootprints.reduce((sum, footprint) => sum + footprint, 0);
        //console.log("Total carbon footprint for recipe:", totalCarbonFootprint);
        // Return the recipe along with its ingredients' carbon footprints
        return {
          ...recipe,
          carbonFootprints,

        };
      })
    );

    // Return recipes with their calculated carbon footprints as props
    return {
      props: {
        recipes: recipesWithCarbonFootprints,
        error: null
      }
    };

  } catch (error) {
    console.error("Error fetching recipes:", error);
    return {
      props: {
        recipes: [],
        error: 'Failed to fetch data'
      }
    };
  }
}