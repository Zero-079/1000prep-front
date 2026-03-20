"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, User, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface RegisterData {
  name: string
  email: string
  address: string
  password: string
  confirmPassword: string
}

interface RegisterFormProps {
  onRegister: (data: RegisterData) => Promise<void> | void
}

export function RegisterForm({ onRegister }: RegisterFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterData, string>>>({})

  function validate(): boolean {
    const next: typeof errors = {}
    if (!name) {
      next.name = "El nombre es obligatorio"
    } else if (name.length < 2) {
      next.name = "Minimo 2 caracteres"
    }
    if (!email) {
      next.email = "El correo es obligatorio"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Ingresa un correo valido"
    }
    if (!address) {
      next.address = "La direccion es obligatoria"
    } else if (address.length < 5) {
      next.address = "Minimo 5 caracteres"
    }
    if (!password) {
      next.password = "La contrasena es obligatoria"
    } else if (password.length < 8) {
      next.password = "Minimo 8 caracteres"
    }
    if (!confirmPassword) {
      next.confirmPassword = "Confirma tu contrasena"
    } else if (password !== confirmPassword) {
      next.confirmPassword = "Las contrasenas no coinciden"
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    try {
      await onRegister({name, email, address, password, confirmPassword })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* Name */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="register-name">Nombre completo</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="register-name"
            type="text"
            placeholder="Tu nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10 h-11 rounded-lg"
            aria-invalid={!!errors.name}
          />
        </div>
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="register-email">Correo electronico</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="register-email"
            type="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-11 rounded-lg"
            aria-invalid={!!errors.email}
          />
        </div>
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      {/* Dirección */}
      
      <div className="flex flex-col gap-2">
        <Label htmlFor="register-address">Dirección</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="register-address"
            type="text"
            placeholder="Tu dirección completa"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="pl-10 h-11 rounded-lg"
            aria-invalid={!!errors.address}
          />
        </div>
        {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
      </div>
      

      {/* Password */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="register-password">Contrasena</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="register-password"
            type={showPassword ? "text" : "password"}
            placeholder="Minimo 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10 h-11 rounded-lg"
            aria-invalid={!!errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Ocultar contrasena" : "Mostrar contrasena"}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="register-confirm">Confirmar contrasena</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="register-confirm"
            type={showConfirm ? "text" : "password"}
            placeholder="Repite tu contrasena"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-10 pr-10 h-11 rounded-lg"
            aria-invalid={!!errors.confirmPassword}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showConfirm ? "Ocultar contrasena" : "Mostrar contrasena"}
          >
            {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-11 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 mt-1"
      >
        {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {"Ya tienes cuenta? "}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Inicia sesion
        </Link>
      </p>
    </form>
  )
}
