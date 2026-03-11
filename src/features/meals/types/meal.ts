export type MealType = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK"
export type FitnessGoal = "WEIGHT_LOSS" | "MUSCLE_GAIN" | "MAINTENANCE"

export interface MealNutrition {
  id: string
  mealId: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sodium: number
}

export interface MealIngredient {
  mealId: string
  ingredientId: string
  ingredient: {
    id: string
    name: string
  }
}

export interface MealAllergen {
  mealId: string
  allergenId: string
  allergen: {
    id: string
    name: string
  }
}

export interface MealRaw {
  id: string
  name: string
  description: string
  imageUrl: string | null
  price: string
  mealType: MealType
  fitnessGoal: FitnessGoal
  isAvailable: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
  nutrition: MealNutrition
  ingredients: MealIngredient[]
  allergens: MealAllergen[]
}

// Este es el tipo que consumirán tus componentes (compatible con tu UI actual)
export interface Meal {
  id: string
  name: string
  description: string
  image: string | null
  price: number
  subscriptionPrice: number
  protein: number
  carbs: number
  fat: number
  calories: number
  tags: string[]
  mealType: MealType
  fitnessGoal: FitnessGoal
  isAvailable: boolean
  isActive: boolean
  ingredients: string[]
  allergens: string[]
  rating?: number
  reviews?: number
}
