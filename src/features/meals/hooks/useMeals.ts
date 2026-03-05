"use client"

import { useState, useEffect } from "react"
import { mealsService } from "../services/meals.service"
import type { Meal } from "../types/meal"

export function useMeals() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await mealsService.getMeals()
        setMeals(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al obtener las comidas")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMeals()
  }, []) // Si luego el backend filtra por fecha, puedes poner 'selectedDate' aquí

  return { meals, isLoading, error }
}
