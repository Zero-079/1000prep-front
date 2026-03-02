// src/features/meals/services/meals.service.ts
import { fetchAPI } from '@/config/api';
import type { MealRaw, MealParsed } from '../types/meal';

const PLACEHOLDER_IMAGE = '/images/meal-placeholder.jpg'; // Asegúrate de tener una imagen aquí en /public/images/

export const mealsService = {
  async getMeals(): Promise<MealParsed[]> {
    // Ajusta la ruta '/meals' o '/meals/daily' según tu backend exacto
    const rawMeals = await fetchAPI<MealRaw[]>('/meals', { 
      method: 'GET',
    });

    return rawMeals
      // 1. Filtrar solo disponibles y activos
      .filter((meal) => meal.isActive && meal.isAvailable)
      // 2. Parsear datos y formatear objeto
      .map((meal) => ({
        id: meal.id,
        name: meal.name,
        description: meal.description,
        imageUrl: meal.imageUrl || PLACEHOLDER_IMAGE,
        price: parseFloat(meal.price) || 0,
        mealType: meal.mealType,
        isAvailable: meal.isAvailable,
        isActive: meal.isActive,
        nutrition: {
          calories: meal.nutrition.calories || 0,
          protein: parseFloat(meal.nutrition.protein) || 0,
          carbs: parseFloat(meal.nutrition.carbs) || 0,
          fat: parseFloat(meal.nutrition.fat) || 0,
          fiber: parseFloat(meal.nutrition.fiber) || 0,
          sodium: parseFloat(meal.nutrition.sodium) || 0,
        },
        ingredients: meal.ingredients.map((item) => item.ingredient.name),
        allergens: meal.allergens || [],
      }));
  },
};
