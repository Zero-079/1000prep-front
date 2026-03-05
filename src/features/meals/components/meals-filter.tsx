"use client"

import { useState, useMemo } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, UtensilsCrossed } from "lucide-react"
import { MealsGrid } from "./meals-grid"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { Meal, MealType } from "@/features/meals/types/meal"

type FilterOption = MealType | "Todos"

const filterOptions: FilterOption[] = ["Todos", "BREAKFAST", "LUNCH", "DINNER", "SNACK"]

const mealTypeLabels: Record<FilterOption, string> = {
  Todos: "Todos",
  BREAKFAST: "Desayuno",
  LUNCH: "Almuerzo",
  DINNER: "Cena",
  SNACK: "Snacks",
}

interface MealsFilterProps {
  meals: Meal[]
  onOpenDetail: (meal: Meal) => void
  isLoading?: boolean
  error?: string | null
}

export function MealsFilter({
  meals,
  onOpenDetail,
  isLoading = false,
  error = null,
}: MealsFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("Todos")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [calendarOpen, setCalendarOpen] = useState(false)

  // Filtrar comidas por tipo
  const filteredMeals = useMemo(() => {
    if (activeFilter === "Todos") return meals
    return meals.filter((m) => m.mealType === activeFilter)
  }, [meals, activeFilter])

  return (
    <div className="bg-card rounded-3xl border border-border shadow-md overflow-hidden">
      {/* Header del Card */}
      <div className="px-6 pt-6 pb-4 md:px-8 md:pt-8 md:pb-5 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <UtensilsCrossed className="size-5 text-primary" />
          </div>
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              Menu del <span className="text-primary">Dia</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-0.5">
              Elige tus comidas, calienta y disfruta
            </p>
          </div>
        </div>

        {/* Date picker + filter chips */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-auto justify-start gap-2 rounded-full px-5 text-sm font-normal"
              >
                <CalendarIcon className="size-4" />
                {format(selectedDate, "EEEE, d 'de' MMMM", {
                  locale: es,
                })}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) {
                    setSelectedDate(date)
                    setCalendarOpen(false)
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:bg-muted hover:text-foreground"
                )}
              >
                {mealTypeLabels[filter]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Meals Grid */}
      <div className="px-6 pb-6 md:px-8 md:pb-8">
        {isLoading ? (
          /* Esqueleto Visual */
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-muted rounded-2xl h-[380px] w-full border border-border"
              />
            ))}
          </div>
        ) : error ? (
          <div className="py-16 text-center text-destructive font-medium bg-red-50 rounded-2xl">
            <p>{error}</p>
          </div>
        ) : (
          <MealsGrid meals={filteredMeals} onOpenDetail={onOpenDetail} />
        )}
      </div>
    </div>
  )
}
