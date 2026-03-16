"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { useMealBatches } from "@/features/subscription/hooks/useMealBatches"
import { MealBatch } from "@/features/subscription/types/meal-batch"

// batchId → quantity
interface MealSelections {
  [batchId: string]: number
}

interface Step2DishesProps {
  fitnessGoal: string | null
  onBack: () => void
  onContinue: (selections: MealSelections) => void
}

export function Step2Dishes({ fitnessGoal, onBack, onContinue }: Step2DishesProps) {
  const { batches, isLoading, error } = useMealBatches()
  const [quantities, setQuantities] = useState<MealSelections>({})
  const maxTotal = 7

  // Decide which batches to display
  const displayedBatches: MealBatch[] = batches

  // Initialise quantities whenever the displayed list changes
  useEffect(() => {
    const initial: MealSelections = {}
    displayedBatches.forEach((b) => {
      // Preserve existing value if the batch was already shown
      initial[b.batchId] = quantities[b.batchId] ?? 0
    })
    setQuantities(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batches, fitnessGoal])

  const total = Object.values(quantities).reduce((sum, qty) => sum + qty, 0)
  const isLimitReached = total >= maxTotal
  const canContinue = total === maxTotal

  const updateQuantity = (batchId: string, change: number) => {
    if (change > 0 && isLimitReached) return
    setQuantities((prev) => ({
      ...prev,
      [batchId]: Math.max(0, Math.min(7, (prev[batchId] ?? 0) + change)),
    }))
  }

  const isAddDisabled = (batchId: string) =>
    isLimitReached && (quantities[batchId] ?? 0) === 0

  // ── Loading / Error states ──────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="text-muted-foreground text-lg animate-pulse">
          Cargando platos disponibles…
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 gap-4">
        <p className="text-destructive text-lg">
          Error al cargar los platos: {error}
        </p>
        <Button variant="outline" onClick={onBack} className="rounded-full">
          ← Atrás
        </Button>
      </div>
    )
  }

  // ── Main render ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          Estos son los platos disponibles
        </h2>
        <p className="text-muted-foreground text-lg">
          Elige cuántas veces quieres cada plato en la semana (máx. 7 en total)
        </p>
      </div>

      {/* Empty state */}
      {displayedBatches.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          No hay platos disponibles para esta semana.
        </div>
      )}

      {/* Dishes Grid */}
      {displayedBatches.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          {displayedBatches.map((batch, index) => (
            <div
              key={batch.batchId}
              className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative h-48 bg-muted overflow-hidden">
                <img
                  src={batch.meal.imageUrl ?? "/placeholder-dish.jpg"}
                  alt={batch.meal.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = "/placeholder-dish.jpg"
                  }}
                />
                {fitnessGoal && batch.meal.fitnessGoal === fitnessGoal && (
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    Recomendado
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Meal Type chip */}
                <div className="mb-3">
                  <span className="inline-block bg-muted text-muted-foreground px-2 py-1 rounded text-xs font-medium">
                    {batch.meal.mealType}
                  </span>
                </div>

                {/* Name and Description */}
                <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                  {batch.meal.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {batch.meal.description}
                </p>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between bg-muted rounded-lg p-2">
                  <button
                    onClick={() => updateQuantity(batch.batchId, -1)}
                    className="p-1 hover:bg-primary/10 rounded transition-colors"
                    disabled={!(quantities[batch.batchId] ?? 0)}
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="w-4 h-4 text-foreground" />
                  </button>
                  <span className="font-bold text-foreground min-w-[2rem] text-center">
                    {quantities[batch.batchId] ?? 0}
                  </span>
                  <button
                    onClick={() => updateQuantity(batch.batchId, 1)}
                    className={`p-1 rounded transition-colors ${
                      isAddDisabled(batch.batchId)
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-primary/10"
                    }`}
                    disabled={isAddDisabled(batch.batchId)}
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="w-4 h-4 text-foreground" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Global Counter */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
        <p className="text-lg font-semibold text-foreground">
          Total seleccionado: <span className="text-primary">{total}</span> / 7
        </p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 pt-4">
        <Button variant="outline" onClick={onBack} className="rounded-full">
          ← Atrás
        </Button>
        <Button
          onClick={() => onContinue(quantities)}
          disabled={!canContinue}
          className="rounded-full px-8"
        >
          Continuar →
        </Button>
      </div>
    </div>
  )
}
