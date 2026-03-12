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

export function useMealBatches(): UseMealBatchesReturn {
  const [batches, setBatches] = useState<MealBatch[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // FIX #3: removed the dead outer `const weekStart` that was never used

  // FIX #1: renamed from getCurrentMonday to getCurrentWeekStart (consistent name)
  const getCurrentWeekStart = (): string => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, "0")
    const dd = String(today.getDate()).padStart(2, "0")
    return `${yyyy}-${mm}-${dd}`
  }

  const fetchBatches = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // FIX #1: use the correct function name
      const weekStart = getCurrentWeekStart()
      const response: AvailableBatchesResponse = await getAvailableBatches(weekStart)

      const flatBatches: MealBatch[] = []
      const rawBatches = response.batches as Record<string, MealBatch[]>

      Object.keys(rawBatches).forEach((key) => {
        const list = rawBatches[key]
        if (list && Array.isArray(list)) {
          flatBatches.push(...list)
        }
      })

      if (flatBatches.length === 0) {
        console.warn("[useMealBatches] Response received but no batches found. Raw response:", response)
      }

      setBatches(flatBatches)

    } catch (err) {
      // FIX #2: restored missing catch block so errors are captured
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch meal batches"
      setError(errorMessage)
      console.error("[useMealBatches] Error fetching batches:", err)
    } finally {
      // FIX #2: restored finally block so isLoading always resets to false
      setIsLoading(false)
    }
  } // FIX #4: this closes fetchBatches correctly

  useEffect(() => {
    fetchBatches()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    batches,
    isLoading,
    error,
    refetch: fetchBatches,
  }
} // this closes useMealBatches
