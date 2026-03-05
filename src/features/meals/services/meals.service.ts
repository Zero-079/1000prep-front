import { fetchAPI } from "@/config/api"
import type { MealRaw, Meal } from "../types/meal"

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80" // Fallback temporal

export const mealsService = {
  async getMeals(): Promise<Meal[]> {
    const rawMeals = await fetchAPI<MealRaw[]>("/meals/daily", { method: "GET" })

    return rawMeals
      // 1. No mostrar comidas inactivas o no disponibles
      .filter((meal) => meal.isActive && meal.isAvailable)
      // 2. Parsear el objeto al formato del frontend
      .map((meal) => {
        const priceNum = parseFloat(meal.price) || 0
        
        return {
          id: meal.id,
          name: meal.name,
          description: meal.description,
          image: meal.imageUrl || PLACEHOLDER_IMAGE,
          price: priceNum,
          subscriptionPrice: priceNum * 0.8, // 20% descuento como indica tu UI
          protein: parseFloat(meal.nutrition?.protein || "0"),
          carbs: parseFloat(meal.nutrition?.carbs || "0"),
          fat: parseFloat(meal.nutrition?.fat || "0"),
          calories: meal.nutrition?.calories || 0,
          tags: [meal.mealType], // Mantenemos compatibilidad con tags
          mealType: meal.mealType,
          isAvailable: meal.isAvailable,
          isActive: meal.isActive,
          ingredients: meal.ingredients?.map((i) => i.ingredient.name) || [],
          allergens: meal.allergens || [],
        }
      })
  },
}
