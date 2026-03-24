"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ProgressBar } from "../../../subscription/components/progressBar.tsx"
import { fullRegisterSchema, type RegisterFormData } from "../../schemas/register.schema"
import { Step1Personal } from "./Step1Personal"
import { Step2Address } from "./Step2Address"
import { Step3Security } from "./Step3Security"
import { useAuth } from "../../hooks/useAuth"

const totalSteps = 3

export function RegisterFlow() {
  const router = useRouter()
  const { register: registerUser, isLoading } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(fullRegisterSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: {
        label: "",
        street: "",
        neighborhood: "",
        city: "",
        references: "",
      },
      password: "",
      confirmPassword: "",
    },
  })

  const handleSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        name: data.name,
        phone: data.phone,
        address: data.address,
      })
      toast.success("¡Cuenta creada!", {
        description: "Bienvenido a 1000Prep. Ya puedes iniciar sesión.",
      })
      router.push("/login")
    } catch (error) {
      // Error is already handled in useAuth hook, it will set the error state
      // and display via the parent component
    }
  }

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-6">
        {/* Header with Steps Counter */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Paso {currentStep} de {totalSteps}
          </p>
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        {/* Step Content */}
        <div className="min-h-96">
          {currentStep === 1 && <Step1Personal onNext={handleNext} />}
          {currentStep === 2 && <Step2Address onNext={handleNext} onBack={handleBack} />}
          {currentStep === 3 && <Step3Security onBack={handleBack} />}
        </div>

        {/* Loading overlay for submit */}
        {isLoading && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center rounded-lg">
            <p className="text-muted-foreground">Creando cuenta...</p>
          </div>
        )}
      </form>
    </FormProvider>
  )
}