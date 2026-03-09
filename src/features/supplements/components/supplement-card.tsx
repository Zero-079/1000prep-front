// src/features/supplements/components/supplement-card.tsx
"use client"

import Image from "next/image"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Supplement } from "@/features/supplements/types/supplement"
import { useSupplementCart } from "@/features/supplements/context/supplements-cart-context"

interface SupplementCardProps {
  supplement: Supplement
  onOpenDetail: (supplement: Supplement) => void
}

export function SupplementCard({ supplement, onOpenDetail }: SupplementCardProps) {
  const { addItem } = useSupplementCart()

  const defaultPresentation = supplement.presentations[0]
  const defaultFlavor = supplement.flavors[0]

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(defaultPresentation.price)

  return (
    <article
      className="group bg-card rounded-2xl border border-border overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onOpenDetail(supplement)}
    >
      {/* Imagen cuadrada con fondo blanco */}
      <div className="relative aspect-square overflow-hidden bg-white">
        {supplement.image ? (
          <Image
            src={supplement.image}
            alt={supplement.name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-5xl">🧪</span>
          </div>
        )}
        {/* Badge categoría */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-card/90 text-foreground backdrop-blur-sm text-[11px] font-medium border-0 shadow-sm">
            {supplement.category}
          </Badge>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col gap-3">
        <div>
          <h3 className="font-semibold text-foreground text-base leading-snug">
            {supplement.name}
          </h3>
          <p className="text-muted-foreground text-sm mt-1 leading-relaxed line-clamp-2">
            {supplement.description}
          </p>
        </div>

        {/* Sabores */}
        {supplement.flavors.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {supplement.flavors.map((flavor) => (
              <span
                key={flavor}
                className="bg-muted text-muted-foreground text-[11px] px-2.5 py-1 rounded-full"
              >
                {flavor}
              </span>
            ))}
          </div>
        )}

        {/* Presentaciones */}
        <div className="flex flex-wrap gap-1.5">
          {supplement.presentations.map((p) => (
            <span
              key={p.size}
              className="bg-primary/10 text-primary text-[11px] px-2.5 py-1 rounded-full font-medium"
            >
              {p.size}
            </span>
          ))}
        </div>

        {/* Precio + CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <span className="text-lg font-bold text-primary leading-none">
            {formattedPrice}
          </span>
          <Button
            size="sm"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 gap-1"
            onClick={(e) => {
              e.stopPropagation()
              addItem(supplement, defaultFlavor, defaultPresentation)
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
