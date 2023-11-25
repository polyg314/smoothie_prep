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


export function calculatePurchases(totalIngredients, ingredients) {

    var ingredientPurchases = []

    var totalsIngs = Object.keys(totalIngredients)

    for (let i = 0; i < totalsIngs.length; i++) {

        var currentIngTotal = totalIngredients[totalsIngs[i]]
        var ingOptions = ingredients.filter(obj => obj.ingredient_type === totalsIngs[i]).sort((a, b) => b.weight_g - a.weight_g);


        while (currentIngTotal > 0) {
            var added = false
            for (let j = 0; j < ingOptions.length; j++) {
                if (currentIngTotal > ingOptions[j]["weight_g"]) {
                    ingredientPurchases.push(ingOptions[j])
                    currentIngTotal = currentIngTotal - ingOptions[j]["weight_g"]
                    added = true
                    break;
                }
            }
            if (!added) {
                for (let j = ingOptions.length - 1; j >= 0; j--) {
                    if (currentIngTotal < ingOptions[j]["weight_g"]) {
                        ingredientPurchases.push(ingOptions[j])
                        currentIngTotal = currentIngTotal - ingOptions[j]["weight_g"]
                        break;
                    }
                }
            }

        }


    }

    const combined = {};

    ingredientPurchases.forEach(item => {
        // Create a unique key for each item based on its properties
        const key = `${item.ingredient_name}-${item.ingredient_type}-${item.weight_g}-${item.amazon_link}-${item.organic}-${item.cost_p_100g}-${item.item_cost}`;

        if (!combined[key]) {
            combined[key] = { ...item, count: 1 };
        } else {
            combined[key].count += 1;
        }
    });

    // Convert the object back to an array
    return Object.values(combined);

}