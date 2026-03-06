"use client"

import Image from "next/image"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Meal } from "@/features/meals/types/meal"
import { useCart } from "@/features/meals/context/cart-context"

interface MealCardProps {
  meal: Meal
  onOpenDetail: (meal: Meal) => void
}

const macroColors = {
  protein: "bg-emerald-500",
  carbs: "bg-orange-400",
  fat: "bg-amber-300",
}
const macroDots = {
  protein: "bg-emerald-500",
  carbs: "bg-orange-400",
  fat: "bg-amber-300",
}

const mealTypeLabels: Record<string, string> = {
  BREAKFAST: "Desayuno",
  LUNCH: "Almuerzo",
  DINNER: "Cena",
  SNACK: "Snack",
}

export function MealCard({ meal, onOpenDetail }: MealCardProps) {
  const { addItem } = useCart()

  const protein = typeof meal.protein === "number" ? meal.protein : parseFloat(String(meal.protein)) || 0
  const carbs = typeof meal.carbs === "number" ? meal.carbs : parseFloat(String(meal.carbs)) || 0
  const fat = typeof meal.fat === "number" ? meal.fat : parseFloat(String(meal.fat)) || 0

  const totalMacros = protein + carbs + fat || 1 // Evitar división por cero
  // Formato Moneda Colombiana
  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(meal.price)

  const formattedSubPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(meal.subscriptionPrice)

  return (
    <article
      className="group bg-card rounded-2xl border border-border overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onOpenDetail(meal)}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        {meal.image ? (
          <Image
            src={meal.image}
            alt={meal.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          // ✅ Si no hay imagen: fondo neutro con ícono
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-4xl">🍽️</span>
          </div>
        )}  
        {/* Tag badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <Badge className="bg-card/90 text-foreground backdrop-blur-sm text-[11px] font-medium border-0 shadow-sm">
              {mealTypeLabels[meal.mealType] || meal.mealType}
            </Badge>
          </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        <div>
          <h3 className="font-semibold text-foreground text-base leading-snug">{meal.name}</h3>
          <p className="text-muted-foreground text-sm mt-1 leading-relaxed line-clamp-2">{meal.description}</p>
        </div>

        {/* Ingredientes y Alérgenos */}
        <div className="flex flex-col gap-1 mt-1">
          {meal.ingredients.length > 0 && (
            <p className="text-[11px] text-muted-foreground line-clamp-1">
              <span className="font-semibold text-foreground">Ingredientes:</span> {meal.ingredients.join(", ")}
            </p>
          )}
          {meal.allergens && meal.allergens.length > 0 && (
            <p className="text-[11px] text-destructive line-clamp-1">
              <span className="font-semibold">Alérgenos:</span> {meal.allergens.join(", ")}
            </p>
          )}
        </div>

        {/* Macro bars */}
        <div className="flex flex-col gap-1.5">
          <div className="flex h-2 rounded-full overflow-hidden bg-muted">
            <div
              className={`${macroColors.protein} transition-all`}
              style={{ width: `${(protein / totalMacros) * 100}%` }}
            />
            <div
              className={`${macroColors.carbs} transition-all`}
              style={{ width: `${(carbs / totalMacros) * 100}%` }}
            />
            <div
              className={`${macroColors.fat} transition-all`}
              style={{ width: `${(fat / totalMacros) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-muted-foreground">
            <span>
              <span className="inline-block size-1.5 rounded-full bg-emerald-500 mr-1 align-middle" />
              P {meal.protein}g
            </span>
            <span>
              <span className="inline-block size-1.5 rounded-full bg-orange-400 mr-1 align-middle" />
              C {meal.carbs}g
            </span>
            <span>
              <span className="inline-block size-1.5 rounded-full bg-amber-300 mr-1 align-middle" />
              G {meal.fat}g
            </span>
            <span className="font-medium text-foreground">{meal.calories} kcal</span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground line-through">{formattedPrice}</span>
            <span className="text-lg font-bold text-primary leading-none">{formattedSubPrice}</span>
          </div>
          <Button
            size="sm"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 gap-1"
            onClick={(e) => {
              e.stopPropagation()
              addItem(meal)
            }}
          >
            <Plus className="size-4" />
            <span className="sr-only sm:not-sr-only">Agregar</span>
          </Button>
        </div>
      </div>
    </article>
  )
}
