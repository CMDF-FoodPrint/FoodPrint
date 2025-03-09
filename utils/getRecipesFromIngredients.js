import { get } from 'http';
import dotenv from 'dotenv';
dotenv.config();
require("dotenv").config(); 
const { request, gql } = require("graphql-request");

const endpoint = "https://production.suggestic.com/graphql";
const apiKey = process.env.NEXT_PUBLIC_SUGGESTIC_API_KEY;

export const getRecipesFromIngredients = async (mustIngredients) => {
    console.log("API Key:", process.env.NEXT_PUBLIC_SUGGESTIC_API_KEY);

    if (!apiKey) {
    throw new Error("API Key is missing. Check your .env file.");
  }

  const query = gql`query foo($mustIngredients: [String!]!) {
      searchRecipesByIngredients(mustIngredients: $mustIngredients) {
        edges {
          node {
            name
            ingredients { name }
            ingredientLines
          }
        }
      }
    }
  `;

  const variables = { mustIngredients };

  console.log("API Key:", apiKey); // Debugging
  console.log("Query Variables:", variables); // Debugging
  console.log("Query Variables:", query); // Debugging

  fetch("https://production.suggestic.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${apiKey}`,
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res.data));

  

//   try {
//     const data = await request(endpoint, query, variables, {
//       headers: {
//         Authorization: `Token ${apiKey}`, // Corrected header format
//       },
//     });
//     return data.searchRecipesByIngredients.edges;
//   } catch (error) {
//     console.error("Error fetching recipes:", error);
//     throw error;
//   }
};
