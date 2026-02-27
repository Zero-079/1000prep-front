"use client"

import type { Meal } from "@/lib/meals-data"
import { MealCard } from "@/components/1000prep/meal-card"

interface MealsGridProps {
  meals: Meal[]
  onOpenDetail: (meal: Meal) => void
}

export function MealsGrid({ meals, onOpenDetail }: MealsGridProps) {
  if (meals.length === 0) {
    return (
      <div className="col-span-full py-16 text-center">
        <p className="text-muted-foreground text-lg">No hay comidas con este filtro.</p>
        <p className="text-muted-foreground text-sm mt-1">Prueba con otro filtro o revisa el menu de otro dia.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} onOpenDetail={onOpenDetail} />
      ))}
    </div>
  )
}
