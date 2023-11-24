export const objectCopy = (inputObject) => {
    return JSON.parse(JSON.stringify(inputObject));  
}



export function calculateTotalIngredients(smoothies) {
    const totals = {};

    smoothies.forEach(smoothie => {
        smoothie.ingredients.forEach(ingredient => {
            if (!totals[ingredient.ingredient_name]) {
                totals[ingredient.ingredient_name] = 0;
            }
            totals[ingredient.ingredient_name] += ingredient.ingredient_weight * smoothie.count;
        });
    });

    return totals;
}