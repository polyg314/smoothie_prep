// Define the smoothie and ingredient types
export interface Ingredient {
    ingredient_name: string;
    ingredient_weight: number;
    ingredient_display: string;
    
}

export interface Smoothie {
    smoothie_name: string;
    smoothie_id: number;
    ingredients: Ingredient[];
}
