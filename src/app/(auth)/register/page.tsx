"use client"

import { RegisterForm } from "@/components/auth"
import type { RegisterData } from "@/components/auth"

export default function RegisterPage() {
  async function handleRegister(data: RegisterData) {
    // Ready to connect to your API
    console.log("Register:", data)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground text-balance">
          Crea tu cuenta
        </h1>
        <p className="text-muted-foreground">
          Empieza tu camino hacia una alimentacion saludable y precisa.
        </p>
      </div>
      <RegisterForm onRegister={handleRegister} />
    </div>
  )
}
