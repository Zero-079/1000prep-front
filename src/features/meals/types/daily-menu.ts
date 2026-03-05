export interface DailyMenuItem {
  id: string
  dailyMenuId: string
  mealId: string
  stock: number
  inStock: boolean
  meal: {
    id: string
    name: string
    mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK"
    isAvailable: boolean
    isActive: boolean
    price: string // o number, verifica qué envía el backend
    nutrition: {
      protein?: number
      carbs?: number
      fat?: number
      calories?: number
      // ... otros campos que tenga
    }
    ingredients: string[]
    allergens: string[]
    // ... otros campos que necesites (image, description, subscriptionPrice, etc.)
  }
}

export interface DailyMenu {
  id: string
  date: string // ISO string: "2026-02-26T00:00:00.000Z"
  validUntil: string | null
  isActive: boolean
  meals: DailyMenuItem[]
}
