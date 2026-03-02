// src/features/meals/types/meal.ts

export type MealType = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";

// 1. Tipo exacto de cómo responde el Backend (strings en valores numéricos)
export interface MealRaw {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  price: string;
  mealType: MealType;
  isAvailable: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  nutrition: {
    id: string;
    mealId: string;
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
    sodium: string;
  };
  ingredients: {
    mealId: string;
    ingredientId: string;
    ingredient: {
      id: string;
      name: string;
    };
  }[];
  allergens: string[];
}

// 2. Tipo limpio y parseado para el Frontend
export interface MealParsed {
  id: string;
  name: string;
  description: string;
  imageUrl: string; // Ya no es null, aseguramos un placeholder
  price: number;
  mealType: MealType;
  isAvailable: boolean;
  isActive: boolean;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sodium: number;
  };
  ingredients: string[]; // Lista aplanada de nombres de ingredientes
  allergens: string[];
}
