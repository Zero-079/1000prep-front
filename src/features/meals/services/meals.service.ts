import { fetchAPI } from "@/config/api"
import type { Meal } from "@/features/meals/types/meal"
import { DailyMenu, DailyMenuItem, MealIngredient } from "@/features/meals/types/daily-menu"

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80"

class MealsService {
  // Helper para convertir string a número
  private parseNumeric(value: any): number {
    if (typeof value === "number") return value
    if (typeof value === "string") {
      const parsed = parseFloat(value)
      return isNaN(parsed) ? 0 : parsed
    }
    return 0
  }

  // Helper para extraer nombres de ingredientes
  private extractIngredientNames(ingredients: MealIngredient[] | string[]): string[] {
    if (!Array.isArray(ingredients)) return []
    return ingredients
      .map((item) => {
        if (typeof item === "object" && item !== null && "ingredient" in item) {
          return (item as MealIngredient).ingredient.name
        }
        if (typeof item === "string") {
          return item
        }
        return null
      })
      .filter((name): name is string => name !== null)
  }

  // Helper para extraer nombres de alérgenos
  private extractAllergenNames(allergens: any[]): string[] {
    if (!Array.isArray(allergens)) return []
    return allergens
      .map((item) => {
        if (typeof item === "object" && item !== null && "allergen" in item) {
          return item.allergen.name
        }
        if (typeof item === "string") {
          return item
        }
        return null
      })
      .filter((name): name is string => name !== null)
  }

  async getMeals(): Promise<Meal[]> {
    try {
      // 1. Obtener menús diarios del backend
      const dailyMenus = await fetchAPI<DailyMenu[]>("/meals/daily", {
        method: "GET",
      })

      // 2. Extraer todas las comidas de todos los menús
      const allMeals: DailyMenuItem[] = []
      for (const menu of dailyMenus) {
        if (menu.isActive) {
          allMeals.push(...menu.meals)
        }
      }

      // 3. Mapear DailyMenuItem al tipo Meal del frontend
      const meals: Meal[] = allMeals
        .filter((item) => item.meal.isActive && item.meal.isAvailable)
        .map((item) => ({
          id: item.meal.id,
          name: item.meal.name,
          description: item.meal.description || "",
          mealType: item.meal.mealType,
          isAvailable: item.meal.isAvailable,
          isActive: item.meal.isActive,
          price: typeof item.meal.price === "string" ? parseFloat(item.meal.price) : item.meal.price,
          subscriptionPrice:
            typeof item.meal.price === "string"
              ? Math.round(parseFloat(item.meal.price) * 0.9)
              : Math.round(item.meal.price * 0.9),
          image: item.meal.image || PLACEHOLDER_IMAGE,
          // ✅ PARSEAR MACROS: Convertir strings a números
          protein: this.parseNumeric(item.meal.nutrition?.protein),
          carbs: this.parseNumeric(item.meal.nutrition?.carbs),
          fat: this.parseNumeric(item.meal.nutrition?.fat),
          calories: this.parseNumeric(item.meal.nutrition?.calories),
          ingredients: this.extractIngredientNames(item.meal.ingredients),
          allergens: this.extractAllergenNames(item.meal.allergens || []),
          tags: [],
        }))

      return meals
    } catch (error) {
      console.error("Error fetching meals:", error)
      throw error
    }
  }
}

export const mealsService = new MealsService()
