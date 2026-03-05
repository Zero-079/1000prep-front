// ✅ Importar desde el tipo centralizado
import type { Meal } from "@/features/meals/types/meal"

// ✅ Exportar SOLO el interfaz CartItem (no Meal, ya que viene de types/meal.ts)
export interface CartItem {
  meal: Meal
  quantity: number
}

// Mantener el mockup con rating y reviews
export const meals: Meal[] = [
  {
    id: "pollo-quinoa",
    name: "Pollo a la Plancha con Quinoa",
    description: "Pechuga de pollo marinada, quinoa esponjosa, brocoli al vapor y tomates cherry.",
    image: "/images/meal-1.jpg",
    price: 11.90,
    subscriptionPrice: 9.50,
    protein: 42,
    carbs: 35,
    fat: 12,
    calories: 420,
    tags: ["Alto en Proteina", "Sin Gluten"],
    mealType: "LUNCH",
    isAvailable: true,
    isActive: true,
    ingredients: ["Pechuga de pollo", "Quinoa", "Brocoli", "Tomate cherry", "Aceite de oliva", "Limon", "Ajo", "Oregano"],
    allergens: [],
    // ✅ Rating y reviews (del mockup)
    rating: 4.8,
    reviews: 124,
  },
  // ... resto de comidas con rating y reviews
]

export const filterOptions = [
  "Todos",
  "Alto en Proteina",
  "Bajo en Calorias",
  "Vegano",
  "Sin Gluten",
] as const

export type FilterOption = (typeof filterOptions)[number]
