"use client"

import { useState, useEffect } from "react"
import { MealBatch, AvailableBatchesResponse } from "../types/meal-batch"
import { getAvailableBatches } from "../services/meal-batch.service"

interface UseMealBatchesReturn {
  batches: MealBatch[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

/**
 * Custom hook to fetch available meal batches for the current week
 * Automatically calculates the current Monday as weekStart
 * Flattens batches from object-by-mealType into a single array
 * @returns Object containing batches array, loading state, error state, and refetch function
 */
export function useMealBatches(): UseMealBatchesReturn {
  const [batches, setBatches] = useState<MealBatch[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /**
   * Calculate the current Monday
   * If today is Monday, returns today
   * Otherwise, calculates the most recent Monday
   */
  const getCurrentMonday = (): string => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    // getDay() returns 0 for Sunday, 1 for Monday, etc.
    const daysToMonday = dayOfWeek === 1 ? 0 : dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    const monday = new Date(today)
    monday.setDate(today.getDate() + daysToMonday)
    return monday.toISOString().split("T")[0]
  }

  const fetchBatches = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const weekStart = getCurrentMonday()
      const response: AvailableBatchesResponse = await getAvailableBatches(weekStart)

      // Flatten batches from object-by-mealType into single array
      const flatBatches: MealBatch[] = []
      const mealTypes = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"] as const

      mealTypes.forEach((mealType) => {
        const batchesForType = response.batches[mealType]
        if (batchesForType && Array.isArray(batchesForType)) {
          flatBatches.push(...batchesForType)
        }
      })

      setBatches(flatBatches)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch meal batches"
      setError(errorMessage)
      console.error("Error fetching meal batches:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBatches()
  }, [])

  return {
    batches,
    isLoading,
    error,
    refetch: fetchBatches,
  }
}
