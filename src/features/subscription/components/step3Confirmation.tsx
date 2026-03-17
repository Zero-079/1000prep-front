"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import type { MealBatch } from "@/features/subscription/types/meal-batch"

interface DishSelection {
  name: string
  mealType: string
  quantity: number
}

interface Step3ConfirmationProps {
  planId: string
  planName: string
  billingType: "onetime" | "subscription"
  objective: string
  dishSelections: { [batchId: string]: DishSelection }
  planPrice: number
  onBack: () => void
}

const timeSlots = ["08:00-09:00", "12:00-13:00", "18:00-19:00"]

const objectiveLabels: Record<string, string> = {
  MUSCLE_GAIN: "Ganar peso",
  MAINTENANCE: "Mantener peso",
  WEIGHT_LOSS: "Perder peso",
}

export function Step3Confirmation({
  planId,
  planName,
  billingType,
  objective,
  dishSelections,
  planPrice,
  onBack,
}: Step3ConfirmationProps) {
  const [address, setAddress] = useState("")
  const [startDate, setStartDate] = useState("")
  const [timeSlot, setTimeSlot] = useState("")

  const getNextMonday = () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const daysToMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek
    const nextMonday = new Date(today)
    nextMonday.setDate(today.getDate() + daysToMonday)
    return nextMonday.toISOString().split("T")[0]
  }

  const totalDishes = Object.values(dishSelections).reduce(
    (sum, info) => sum + info.quantity,
    0
  )

  const billingTypeLabel =
    billingType === "subscription" ? "Suscripción" : "Pago único"

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <div className="bg-primary/10 rounded-full p-6">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>
      </div>

      <div className="text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          ¡Todo listo!
        </h2>
        <p className="text-muted-foreground text-lg">
          Ya puedes comenzar con tu cambio
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-serif text-lg font-bold text-foreground mb-4">
            Plan elegido
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plan:</span>
              <span className="font-semibold text-foreground">{planName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Tipo de pago:</span>
              <span className="font-semibold text-foreground">
                {billingTypeLabel}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Objetivo:</span>
              <span className="font-semibold text-foreground">
                {objectiveLabels[objective]}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-serif text-lg font-bold text-foreground mb-4">
            Platos seleccionados
          </h3>

          <div className="space-y-2 max-h-32 overflow-y-auto">
            {Object.entries(dishSelections)
              .filter(([_, info]) => info.quantity > 0)
              .map(([batchId, info]) => (
                <div key={batchId} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{info.name}</span>
                  <span className="font-semibold text-foreground">
                    {info.quantity}x
                  </span>
                </div>
              ))}
          </div>

          <div className="border-t border-border mt-3 pt-3">
            <div className="flex justify-between font-semibold">
              <span>Total por semana:</span>
              <span className="text-primary">{totalDishes} platos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
        <h3 className="font-serif text-lg font-bold text-foreground">
          Detalles de entrega
        </h3>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Dirección de entrega
          </label>

          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Calle, apartamento, ciudad..."
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Fecha de inicio (debe ser lunes)
          </label>

          <input
            type="date"
            value={startDate || getNextMonday()}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Franja horaria
          </label>

          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Selecciona una franja horaria</option>

            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-muted-foreground mb-2">
              Precio total por ciclo
            </p>

            <p className="font-serif text-4xl font-bold text-foreground">
              ${planPrice.toLocaleString("es-CO")}
            </p>
          </div>

          <p className="text-sm text-muted-foreground">COP</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 pt-4">
        <Button variant="outline" onClick={onBack} className="rounded-full">
          ← Atrás
        </Button>

        <Button
          disabled={!address || !startDate || !timeSlot}
          className="rounded-full px-8"
        >
          Confirmar suscripción
        </Button>
      </div>
    </div>
  )
}