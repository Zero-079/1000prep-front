"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { dishes } from "@/lib/dishes-data"
import { Minus, Plus } from "lucide-react"

interface DishQuantity {
  [key: string]: number
}

interface Step2DishesProps {
  onBack: () => void
  onContinue: (selections: DishQuantity) => void
}

export function Step2Dishes({ onBack, onContinue }: Step2DishesProps) {
  const [quantities, setQuantities] = useState<DishQuantity>({})
  const maxTotal = 7

  useEffect(() => {
    // Initialize quantities
    const initial: DishQuantity = {}
    dishes.forEach((dish) => {
      initial[dish.id] = 0
    })
    setQuantities(initial)
  }, [])

  const total = Object.values(quantities).reduce((sum, qty) => sum + qty, 0)
  const isLimitReached = total >= maxTotal
  const canContinue = total > 0

  const updateQuantity = (dishId: string, change: number) => {
    const newQuantities = { ...quantities }
    const currentQty = newQuantities[dishId] || 0
    const newQty = Math.max(0, Math.min(7, currentQty + change))

    // Check if we can add more
    if (change > 0 && isLimitReached) {
      return
    }

    newQuantities[dishId] = newQty
    setQuantities(newQuantities)
  }

  const isAddDisabled = (dishId: string) => {
    const currentQty = quantities[dishId] || 0
    return isLimitReached && currentQty === 0
  }

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

      {/* Dishes Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {dishes.map((dish, index) => (
          <div
            key={dish.id}
            className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-md transition-shadow"
          >
            {/* Image */}
            <div className="relative h-48 bg-muted overflow-hidden">
              <img
                src={dish.imageUrl}
                alt={dish.name}
                className="w-full h-full object-cover"
              />
              {dish.isRecommended && (
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  Recomendado
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Meal Type Badge */}
              <div className="mb-3">
                <span className="inline-block bg-muted text-muted-foreground px-2 py-1 rounded text-xs font-medium">
                  {dish.mealType}
                </span>
              </div>

              {/* Name and Description */}
              <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                {dish.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {dish.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between bg-muted rounded-lg p-2">
                <button
                  onClick={() => updateQuantity(dish.id, -1)}
                  className="p-1 hover:bg-primary/10 rounded transition-colors"
                  disabled={!quantities[dish.id]}
                >
                  <Minus className="w-4 h-4 text-foreground" />
                </button>
                <span className="font-bold text-foreground min-w-[2rem] text-center">
                  {quantities[dish.id] || 0}
                </span>
                <button
                  onClick={() => updateQuantity(dish.id, 1)}
                  className={`p-1 rounded transition-colors ${
                    isAddDisabled(dish.id)
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-primary/10"
                  }`}
                  disabled={isAddDisabled(dish.id)}
                >
                  <Plus className="w-4 h-4 text-foreground" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global Counter */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
        <p className="text-lg font-semibold text-foreground">
          Total seleccionado: <span className="text-primary">{total}</span> / 7
        </p>
      </div>

      {/* Navigation Buttons */}
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
