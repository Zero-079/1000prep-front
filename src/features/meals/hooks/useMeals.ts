// src/features/meals/hooks/useMeals.ts
'use client'

import { useEffect, useState } from 'react'
import { mealsService } from '../services/meals.service'
import type { Meal } from '@/lib/types/meal'

export function useMeals(date?: string, mealType?: string) {
  const [meals, setMeals] = useState<Meal[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true)
        const { meals: data } = await mealsService.getDailyMeals(date, mealType)
        setMeals(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchMeals()
  }, [date, mealType])

  return { meals, loading, error }
}
