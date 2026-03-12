// src/features/supplements/components/supplements-filter.tsx
"use client"

import { useState, useMemo } from "react"
import { FlaskConical } from "lucide-react"
import { SupplementCard } from "./supplement-card"
import type { Supplement, SupplementCategory } from "@/features/supplements/types/supplement"
import { cn } from "@/lib/utils"

const FILTER_OPTIONS: SupplementCategory[] = [
  "Todos",
  "Proteína",
  "Vitaminas",
  "Creatina",
  "Pre-entreno",
  "Recuperación",
]

interface SupplementsFilterProps {
  supplements: Supplement[]
  onOpenDetail: (supplement: Supplement) => void
}

export function SupplementsFilter({
  supplements,
  onOpenDetail,
}: SupplementsFilterProps) {
  const [activeFilter, setActiveFilter] = useState<SupplementCategory>("Todos")

  const filtered = useMemo(() => {
    if (activeFilter === "Todos") return supplements
    return supplements.filter((s) => s.category === activeFilter)
  }, [supplements, activeFilter])

  return (
    <div className="bg-card rounded-3xl border border-border shadow-md overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 md:px-8 md:pt-8 md:pb-5 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FlaskConical className="size-5 text-primary" />
          </div>
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              Catálogo de <span className="text-primary">Suplementos</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-0.5">
              Seleccionados y verificados por nuestros nutricionistas
            </p>
          </div>
        </div>

        {/* Chips de filtro */}
        <div className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((filter) => (
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
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 pb-6 md:px-8 md:pb-8">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            <p className="text-lg font-medium">
              No hay suplementos en esta categoría
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((s) => (
              <SupplementCard
                key={s.id}
                supplement={s}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
