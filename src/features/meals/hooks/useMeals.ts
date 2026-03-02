// src/features/meals/hooks/useMeals.ts
'use client';

import { useState, useEffect, useMemo } from 'react';
import { mealsService } from '../services/meals.service';
import type { MealParsed, MealType } from '../types/meal';

export type FilterOption = MealType | "ALL";

export function useMeals() {
  const [meals, setMeals] = useState<MealParsed[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterOption>("ALL");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await mealsService.getMeals();
        setMeals(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar las comidas');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, []);

  // Filtrado reactivo en el frontend
  const filteredMeals = useMemo(() => {
    if (activeFilter === "ALL") return meals;
    return meals.filter((meal) => meal.mealType === activeFilter);
  }, [meals, activeFilter]);

  return {
    meals: filteredMeals,
    isLoading,
    error,
    activeFilter,
    setActiveFilter,
  };
}
