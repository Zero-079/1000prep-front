"use client"

import { LoginForm } from "@/components/auth"
import type { LoginData } from "@/components/auth"

export default function LoginPage() {
  async function handleLogin(data: LoginData) {
    // Ready to connect to your API
    console.log("Login:", data)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground text-balance">
          Bienvenido de vuelta
        </h1>
        <p className="text-muted-foreground">
          Inicia sesion para acceder a tu plan nutricional.
        </p>
      </div>
      <LoginForm onLogin={handleLogin} />
    </div>
  )
}
