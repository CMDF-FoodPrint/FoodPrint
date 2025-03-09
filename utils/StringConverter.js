const convertRecipesToString = (recipes) => {
    return recipes.map(({ node }) => {
        const ingredientNames = node.ingredients.map(ingredient => ingredient.name).join(", ");
        return `Recipe: ${node.name}\nIngredients: ${ingredientNames}`;
    }).join("\n\n");
};