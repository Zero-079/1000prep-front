import { fetchAPI } from "@/config/api"
import type { MealRaw, Meal } from "@/features/meals/types/meal"
import { DailyMenu, DailyMenuItem } from "@/features/meals/types/daily-menu"
import { id } from "date-fns/locale"

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80" // Fallback temporal

class MealsService {
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
          // Filtrar solo menús activos
          allMeals.push(...menu.meals)
        }
      }

      // 3. Mapear DailyMenuItem al tipo Meal del frontend
      const meals: Meal[] = allMeals
        .filter((item) => item.meal.isActive && item.meal.isAvailable)
        // Opcionalmente: descomenta si quieres ocultar comidas sin stock
        // .filter((item) => item.inStock)
        .map((item) => ({
          id: item.meal.id,
          name: item.meal.name,
          mealType: item.meal.mealType,
          isAvailable: item.meal.isAvailable,
          isActive: item.meal.isActive,
          price: typeof item.meal.price === "string" ? parseFloat(item.meal.price) : item.meal.price,
          subscriptionPrice:
            typeof item.meal.price === "string"
              ? Math.round(parseFloat(item.meal.price) * 0.9) // 10% descuento
              : Math.round(item.meal.price * 0.9),
          image: PLACEHOLDER_IMAGE, // Ajusta si el backend devuelve imagen
          description: "", // Ajusta si el backend devuelve descripción
          protein: item.meal.nutrition?.protein ?? 0,
          carbs: item.meal.nutrition?.carbs ?? 0,
          fat: item.meal.nutrition?.fat ?? 0,
          calories: item.meal.nutrition?.calories ?? 0,
          ingredients: item.meal.ingredients ?? [],
          allergens: item.meal.allergens ?? [],
          tags: [], // Ajusta si el backend devuelve tags
        }))

      return meals
    } catch (error) {
      console.error("Error fetching meals:", error)
      throw error
    }
  }
}

export const mealsService = new MealsService()
