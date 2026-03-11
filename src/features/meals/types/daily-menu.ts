import { MealAllergen, MealIngredient, MealNutrition, MealRaw } from "./meal"

export interface DailyMenuItem {
  id: string
  dailyMenuId: string
  mealId: string
  stock: number
  mealBatchId: string | null
  meal: MealRaw
  inStock: boolean
  canOrder: boolean
  orderDeadline: string 
  matchesUserGoals: boolean
}

export interface DailyMenu {
  id: string
  date: string // ISO string: "2026-02-26T00:00:00.000Z"
  validUntil: string | null
  isActive: boolean
  meals: DailyMenuItem[]
}
