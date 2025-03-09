import axios from "axios";

const SUGGESTIC_API_URL = "https://api.suggestic.com/graphql";
const SUGGESTIC_API_KEY = process.env['SUGGESTIC_API_KEY'];

export async function getRecipesByIngredients(ingredients) {
  const query = {
    query: `
      {
        searchRecipesByIngredients(mustIngredients: ${JSON.stringify(
          ingredients
        )}) {
          edges {
            node {
              name
              ingredients {
                name
              }
              ingredientLines
            }
          }
        }
      }
    `,
  };

  try {
    const response = await axios.post(SUGGESTIC_API_URL, query, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUGGESTIC_API_KEY}`,
      },
    });

    return response.data.data.searchRecipesByIngredients.edges.map(
      (edge) => ({
        name: edge.node.name,
        ingredients: edge.node.ingredients.map((i) => i.name),
        ingredientLines: edge.node.ingredientLines,
      })
    );
  } catch (error) {
    console.error("Error fetching recipes from Suggestic:", error);
    return [];
  }
}