// src/lib/types/meal.ts
export interface Nutrition {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sodium: number
}

export interface Ingredient {
  ingredient: {
    id: string
    name: string
  }
}

export interface Allergen {
  allergen: {
    id: string
    name: string
  }
}

export interface Meal {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  mealType: string
  isAvailable: boolean
  isActive: boolean
  nutrition: Nutrition
  ingredients: Ingredient[]
  allergens: Allergen[]
}
