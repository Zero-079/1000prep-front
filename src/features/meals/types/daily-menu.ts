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

export interface DailyMenuItem {
  id: string
  dailyMenuId: string
  mealId: string
  stock: number
  inStock: boolean
  meal: {
    id: string
    name: string
    description?: string
    mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK"
    isAvailable: boolean
    isActive: boolean
    price: string | number
    image?: string
    nutrition: {
      protein?: number
      carbs?: number
      fat?: number
      calories?: number
    }
    ingredients: MealIngredient[]  // ✅ Array de objetos, no strings
    allergens: MealAllergen[] | string[]  // Soporta ambos formatos
  }
}

export interface DailyMenu {
  id: string
  date: string // ISO string: "2026-02-26T00:00:00.000Z"
  validUntil: string | null
  isActive: boolean
  meals: DailyMenuItem[]
}
