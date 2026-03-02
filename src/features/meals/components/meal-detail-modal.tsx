"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Minus, Plus, Flame, Wheat, Droplets, Zap, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Meal } from "../../../lib/meals-data"
import { useCart } from "@/features/meals/context/cart-context"

interface MealDetailModalProps {
  meal: Meal | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MealDetailModal({ meal, open, onOpenChange }: MealDetailModalProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  if (!meal) return null

  const handleAdd = () => {
    addItem(meal, quantity)
    setQuantity(1)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-2xl">
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
          <Image
            src={meal.image}
            alt={meal.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 672px"
          />
          {meal.tags.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
              {meal.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="bg-card/90 text-foreground backdrop-blur-sm text-xs font-medium border-0 shadow-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5">
          <DialogHeader className="text-left gap-1">
            <DialogTitle className="font-serif text-2xl font-bold text-foreground">{meal.name}</DialogTitle>
            <DialogDescription className="text-muted-foreground text-base leading-relaxed">
              {meal.description}
            </DialogDescription>
          </DialogHeader>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`size-4 ${
                    i < Math.round(meal.rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">{meal.rating}</span>
            <span className="text-sm text-muted-foreground">({meal.reviews} resenas)</span>
          </div>

          {/* Macros */}
          <div className="grid grid-cols-4 gap-3">
            <MacroCard icon={<Zap className="size-4" />} label="Proteina" value={`${meal.protein}g`} color="text-primary" />
            <MacroCard icon={<Wheat className="size-4" />} label="Carbs" value={`${meal.carbs}g`} color="text-secondary" />
            <MacroCard icon={<Droplets className="size-4" />} label="Grasa" value={`${meal.fat}g`} color="text-amber-500" />
            <MacroCard icon={<Flame className="size-4" />} label="Calorias" value={`${meal.calories}`} color="text-foreground" />
          </div>

          <Separator />

          {/* Ingredients */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-2">Ingredientes</h4>
            <div className="flex flex-wrap gap-1.5">
              {meal.ingredients.map((ing) => (
                <span key={ing} className="bg-muted text-muted-foreground text-xs px-2.5 py-1 rounded-full">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Allergens */}
          {meal.allergens.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-1.5">
                <AlertTriangle className="size-3.5 text-amber-500" />
                Alergenos
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {meal.allergens.map((a) => (
                  <span key={a} className="bg-amber-50 text-amber-700 border border-amber-200 text-xs px-2.5 py-1 rounded-full font-medium">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Quantity + Add to cart */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon-sm"
                className="rounded-full"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Disminuir cantidad"
              >
                <Minus className="size-4" />
              </Button>
              <span className="w-10 text-center text-base font-semibold tabular-nums">{quantity}</span>
              <Button
                variant="outline"
                size="icon-sm"
                className="rounded-full"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Aumentar cantidad"
              >
                <Plus className="size-4" />
              </Button>
            </div>
            <Button
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 text-base"
              size="lg"
              onClick={handleAdd}
            >
              Agregar al Carrito - {(meal.subscriptionPrice * quantity).toFixed(2)}&euro;
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function MacroCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 bg-muted/50 rounded-xl p-3">
      <div className={color}>{icon}</div>
      <span className="text-base font-bold text-foreground">{value}</span>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  )
}
