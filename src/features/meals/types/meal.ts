export type MealType = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK"

export interface MealRaw {
  id: string
  name: string
  description: string
  imageUrl: string | null
  price: string
  mealType: MealType
  isAvailable: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
  nutrition: {
    id: string
    mealId: string
    calories: number
    protein: string
    carbs: string
    fat: string
    fiber: string
    sodium: string
  }
  ingredients: {
    mealId: string
    ingredientId: string
    ingredient: {
      id: string
      name: string
    }
  }[]
  allergens: string[]
}

// Este es el tipo que consumirán tus componentes (compatible con tu UI actual)
export interface Meal {
  id: string
  name: string
  description: string
  image: string
  price: number
  subscriptionPrice: number // Calculado para la UI (20% descuento)
  protein: number
  carbs: number
  fat: number
  calories: number
  tags: string[]
  mealType: MealType
  isAvailable: boolean
  isActive: boolean
  ingredients: string[]
  allergens: string[]
  rating?: number
  reviews?: number
}
