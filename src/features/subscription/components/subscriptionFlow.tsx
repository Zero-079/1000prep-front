"use client"

import { useState } from "react"
import { ProgressBar } from "./progressBar.tsx"
import { Step1Objective } from "./step1Objective"
import { Step2Dishes } from "./step2Dishes"
import { Step3Confirmation } from "./step3Confirmation"

interface DishQuantity {
  [key: string]: number
}

interface SubscriptionFlowProps {
  planId: string
  planName: string
  billingType: "onetime" | "subscription"
  planPrice: number
}

export function SubscriptionFlow({
  planId,
  planName,
  billingType,
  planPrice,
}: SubscriptionFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [objective, setObjective] = useState<string | null>(null)
  const [dishSelections, setDishSelections] = useState<DishQuantity>({})

  const totalSteps = 3

  const handleStep1Continue = () => {
    if (objective) {
      setCurrentStep(2)
    }
  }

  const handleStep2Continue = (selections: DishQuantity) => {
    setDishSelections(selections)
    setCurrentStep(3)
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1))
  }

  return (
    <div className="space-y-8">
      {/* Header with Steps Counter */}
      <div className="text-center">
        <p className="text-muted-foreground mb-4">
          Paso {currentStep} de {totalSteps}
        </p>
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      {/* Step Content */}
      <div className="min-h-96">
        {currentStep === 1 && (
          <Step1Objective
            selected={objective}
            onSelect={setObjective}
            onContinue={handleStep1Continue}
          />
        )}
        {currentStep === 2 && (
          <Step2Dishes
            onBack={handleBack}
            onContinue={handleStep2Continue}
          />
        )}
        {currentStep === 3 && (
          <Step3Confirmation
            planId={planId}
            planName={planName}
            billingType={billingType}
            objective={objective || ""}
            dishSelections={dishSelections}
            planPrice={planPrice}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  )
}
