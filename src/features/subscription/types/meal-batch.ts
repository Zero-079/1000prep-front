export interface MealBatchNutrition {
  id: string
  mealId: string
  calories: number
  protein: string
  carbs: string
  fat: string
  fiber: string
  sodium: string
}

export interface MealBatchMeal {
  id: string
  name: string
  description: string
  imageUrl: string | null
  price: string
  mealType: string
  fitnessGoal: "MUSCLE_GAIN" | "WEIGHT_LOSS" | "MAINTENANCE" | null
  nutrition: MealBatchNutrition
  allergens: string[]
}

export interface MealBatch {
  batchId: string
  weekStart: string
  subscriptionDeadline: string
  plannedQty: number
  subscribedCount: number
  availableSpots: number
  meal: MealBatchMeal
}

export interface AvailableBatchesResponse {
  weekStart: string
  weekEnd: string
  batches: {
    LUNCH?: MealBatch[]
    DINNER?: MealBatch[]
    BREAKFAST?: MealBatch[]
    SNACK?: MealBatch[]
  }
}
