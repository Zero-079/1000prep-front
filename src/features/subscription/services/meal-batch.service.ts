import { fetchAPI } from "@/config/api"
import { AvailableBatchesResponse } from "../types/meal-batch"

/**
 * Get available meal batches for a given week
 * @param weekStart - ISO date string for Monday (e.g., "2026-03-12")
 * @returns AvailableBatchesResponse with batches organized by meal type
 */
export async function getAvailableBatches(
  weekStart: string
): Promise<AvailableBatchesResponse> {
  return fetchAPI<AvailableBatchesResponse>(
    `/meal-batches/available?weekStart=${weekStart}`
  )
}
