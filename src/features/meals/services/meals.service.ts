// src/features/meals/services/meals.service.ts
import { fetchAPI } from '@/config/api'
import type { Meal } from '../../../lib/types/meal'

export const mealsService = {
  async getDailyMeals(date?: string, mealType?: string) {
    const params = new URLSearchParams()
    if (date) params.append('date', date)
    if (mealType) params.append('mealType', mealType)
    
    return fetchAPI<{ meals: Meal[] }>(
      `/meals/daily${params.size > 0 ? '?' + params : ''}`,
      { method: 'GET' }
    )
  },

  async getMealById(id: string) {
    return fetchAPI<Meal>(`/meals/${id}`, { method: 'GET' })
  },
}
