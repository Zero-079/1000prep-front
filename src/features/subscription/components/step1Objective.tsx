"use client"

import { Button } from "@/components/ui/button"

interface ObjectiveOption {
  id: "MUSCLE_GAIN" | "MAINTENANCE" | "WEIGHT_LOSS"
  label: string
  description: string
}

const objectives: ObjectiveOption[] = [
  {
    id: "MUSCLE_GAIN",
    label: "Ganar peso",
    description: "Aumenta tu masa muscular con planes altos en proteína",
  },
  {
    id: "MAINTENANCE",
    label: "Mantener peso",
    description: "Mantén tu peso ideal con una alimentación balanceada",
  },
  {
    id: "WEIGHT_LOSS",
    label: "Perder peso",
    description: "Reduce grasa con planes hipocalóricos y nutritivos",
  },
]

interface Step1ObjectiveProps {
  selected: string | null
  onSelect: (value: string) => void
  onContinue: () => void
}

export function Step1Objective({
  selected,
  onSelect,
  onContinue,
}: Step1ObjectiveProps) {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          ¿Cuál es tu objetivo?
        </h2>
        <p className="text-muted-foreground text-lg">
          Selecciona el objetivo que mejor se adapte a ti
        </p>
      </div>

      {/* Objectives Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {objectives.map((objective) => (
          <button
            key={objective.id}
            onClick={() => onSelect(objective.id)}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left bg-card ${
              selected === objective.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground"
            }`}
          >
            <h3 className="font-serif text-xl font-bold text-foreground mb-2">
              {objective.label}
            </h3>
            <p className="text-sm text-muted-foreground">
              {objective.description}
            </p>
          </button>
        ))}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={onContinue}
          disabled={!selected}
          size="lg"
          className="rounded-full px-12"
        >
          Continuar →
        </Button>
      </div>
    </div>
  )
}
