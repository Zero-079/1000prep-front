"use client"

import { RegisterForm } from "@/features/auth/components"
import type { RegisterData } from "@/features/auth/components"
import { useAuth } from '@/features/auth/hooks/useAuth'

export default function RegisterPage() {
  const { register, isLoading, error } = useAuth()

  async function handleRegister(data: RegisterData) {
    // Ready to connect to your API
      try {
      // Mapear datos del formulario al payload del backend
      await register({
        email: data.email,
        password: data.password,
        name: data.name,
        address: data.address,
        phone: '111', // El formulario actual NO tiene teléfono, necesitarás agregarlo
      })
    } catch (err) {
      console.error('Register error:', err)
    }
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
      
      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <RegisterForm onRegister={handleRegister}/>
    </div>
  )
}
    

