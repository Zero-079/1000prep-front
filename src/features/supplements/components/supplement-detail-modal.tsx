// src/features/supplements/components/supplement-detail-modal.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, CheckCircle2 } from "lucide-react"
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
import type { Supplement, SupplementPresentation } from "@/features/supplements/types/supplement"
import { useSupplementCart } from "@/features/supplements/context/supplements-cart-context"
import { cn } from "@/lib/utils"

interface SupplementDetailModalProps {
  supplement: Supplement | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SupplementDetailModal({
  supplement,
  open,
  onOpenChange,
}: SupplementDetailModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedFlavor, setSelectedFlavor] = useState<string>("")
  const [selectedPresentation, setSelectedPresentation] =
    useState<SupplementPresentation | null>(null)
  const { addItem } = useSupplementCart()

  // Inicializar selecciones cuando cambia el suplemento
  if (!supplement) return null

  const activeFlavor = selectedFlavor || supplement.flavors[0]
  const activePresentation = selectedPresentation || supplement.presentations[0]

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(activePresentation.price)

  const handleAdd = () => {
    addItem(supplement, activeFlavor, activePresentation, quantity)
    setQuantity(1)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-2xl">
        {/* Imagen */}
        <div className="relative w-full aspect-square sm:aspect-video overflow-hidden rounded-t-2xl bg-white">
          {supplement.image ? (
            <Image
              src={supplement.image}
              alt={supplement.name}
              fill
              className="object-contain p-8"
              sizes="(max-width: 640px) 100vw, 672px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <span className="text-7xl">🧪</span>
            </div>
          )}
          <div className="absolute top-4 left-4">
            <Badge className="bg-card/90 text-foreground backdrop-blur-sm text-xs font-medium border-0 shadow-sm">
              {supplement.category}
            </Badge>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5">
          <DialogHeader className="text-left gap-1">
            <DialogTitle className="font-serif text-2xl font-bold text-foreground">
              {supplement.name}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-base leading-relaxed">
              {supplement.description}
            </DialogDescription>
          </DialogHeader>

          {/* Selector de sabor */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-2">Sabor</h4>
            <div className="flex flex-wrap gap-2">
              {supplement.flavors.map((flavor) => (
                <button
                  key={flavor}
                  onClick={() => setSelectedFlavor(flavor)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
                    activeFlavor === flavor
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:bg-muted"
                  )}
                >
                  {flavor}
                </button>
              ))}
            </div>
          </div>

          {/* Selector de presentación */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-2">Presentación</h4>
            <div className="flex flex-wrap gap-2">
              {supplement.presentations.map((p) => (
                <button
                  key={p.size}
                  onClick={() => setSelectedPresentation(p)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium border transition-colors",
                    activePresentation.size === p.size
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:bg-muted"
                  )}
                >
                  {p.size} —{" "}
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                  }).format(p.price)}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Tabla nutricional placeholder */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-3">
              Información Nutricional
            </h4>
            <div className="bg-muted/50 rounded-xl overflow-hidden border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Nutriente
                    </th>
                    <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Por porción
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { label: "Calorías", value: "–" },
                    { label: "Proteínas", value: "–" },
                    { label: "Carbohidratos", value: "–" },
                    { label: "Grasas totales", value: "–" },
                    { label: "Sodio", value: "–" },
                  ].map((row) => (
                    <tr key={row.label}>
                      <td className="px-4 py-2 text-foreground">{row.label}</td>
                      <td className="px-4 py-2 text-right text-muted-foreground">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">
              * Datos nutricionales detallados disponibles próximamente
            </p>
          </div>

          {/* Beneficios */}
          {supplement.benefits.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-2">
                Beneficios clave
              </h4>
              <ul className="flex flex-col gap-1.5">
                {supplement.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator />

          {/* Cantidad + Agregar */}
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
              <span className="w-10 text-center text-base font-semibold tabular-nums">
                {quantity}
              </span>
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
              Agregar al Carrito — {formattedPrice}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
