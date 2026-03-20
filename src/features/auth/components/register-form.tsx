"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, User, MapPin, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { el } from "date-fns/locale"

export interface AddressData {
  label: string
  street: string
  neighborhood: string
  city: string
  references?: string
}

export interface RegisterData {
  name: string
  email: string
  phone: string
  address: AddressData | null
  password: string
  confirmPassword: string
}

interface RegisterFormProps {
  onRegister: (data: RegisterData) => Promise<void> | void
}

export function RegisterForm({ onRegister }: RegisterFormProps) {
  const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [phone, setPhone] = useState("")
const [address, setAddress] = useState<AddressData | null>(null)
const [password, setPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")
const [showPassword, setShowPassword] = useState(false)
const [showConfirm, setShowConfirm] = useState(false)
const [isSubmitting, setIsSubmitting] = useState(false)
const [errors, setErrors] = useState<Partial<Record<string, string>>>({})

const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
const [addrLabel, setAddrLabel] = useState("")
const [addrStreet, setAddrStreet] = useState("")
const [addrNeighborhood, setAddrNeighborhood] = useState("")
const [addrCity, setAddrCity] = useState("")
const [addrReferences, setAddrReferences] = useState("")
const [addressErrors, setAddressErrors] = useState<Partial<Record<string, string>>>({})


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
    if (!phone) {
      next.phone = "El teléfono es obligatorio"
    } else if (!/^\d{7,15}$/.test(phone)) {
      next.phone = "Ingresa un teléfono válido"
    }

    if (!address) {
      next.address = "Debes agregar una dirección"
    }
    if (!password) {
      next.password = "La contrasena es obligatoria"
    } else if (password.length < 8) {
      next.password = "Minimo 8 caracteres"
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
      await onRegister({ name,
        email,
        phone, 
        address,
        password,
        confirmPassword 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function validateAddressModal() {
    const next: typeof addressErrors = {}

    if (!addrLabel) next.label = "El nombre de la dirección es obligatorio"
    if (!addrStreet) next.street = "La calle es obligatoria"
    else if (addrStreet.length < 5) next.street = "Mínimo 5 caracteres"
    if (!addrNeighborhood) next.neighborhood = "El barrio es obligatorio"
    if (!addrCity) next.city = "La ciudad es obligatoria"

    setAddressErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSaveAddress() {
    if (!validateAddressModal()) return

    setAddress({
      label: addrLabel,
      street: addrStreet,
      neighborhood: addrNeighborhood,
      city: addrCity,
      references: addrReferences || undefined,
    })

    setErrors((prev) => ({ ...prev, address: undefined }))
    setIsAddressModalOpen(false)
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
            {/* Phone */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="register-phone">Teléfono</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="register-phone"
            type="tel"
            placeholder="3001234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="pl-10 h-11 rounded-lg"
            aria-invalid={!!errors.phone}
          />
        </div>
        {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
      </div>

      {/* Dirección */}
      <div className="flex flex-col gap-2">
        <Label>Dirección</Label>

        {address ? (
          <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
            <p className="font-medium text-foreground">{address.label}</p>
            <p className="text-muted-foreground">
              {address.street}, {address.neighborhood}, {address.city}
            </p>
            {address.references && (
              <p className="text-muted-foreground">Referencia: {address.references}</p>
            )}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
            Aún no has agregado una dirección.
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          className="h-11 rounded-lg"
          onClick={() => {
            if (address) {
              setAddrLabel(address.label)
              setAddrStreet(address.street)
              setAddrNeighborhood(address.neighborhood)
              setAddrCity(address.city)
              setAddrReferences(address.references ?? "")
            }
            setIsAddressModalOpen(true)
          }}
        >
          {address ? "Editar dirección" : "Agregar dirección"}
        </Button>

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
            {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-background shadow-xl border border-border">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Agregar dirección</h3>
                <p className="text-sm text-muted-foreground">
                  Completa los datos de entrega.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddressModalOpen(false)}
                className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Cerrar ventana"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-col gap-4 px-5 py-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="addr-label">Nombre</Label>
                <Input
                  id="addr-label"
                  type="text"
                  placeholder="Casa"
                  value={addrLabel}
                  onChange={(e) => setAddrLabel(e.target.value)}
                  aria-invalid={!!addressErrors.label}
                />
                {addressErrors.label && (
                  <p className="text-sm text-destructive">{addressErrors.label}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="addr-street">Calle</Label>
                <Input
                  id="addr-street"
                  type="text"
                  placeholder="Calle 45 #12-34"
                  value={addrStreet}
                  onChange={(e) => setAddrStreet(e.target.value)}
                  aria-invalid={!!addressErrors.street}
                />
                {addressErrors.street && (
                  <p className="text-sm text-destructive">{addressErrors.street}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="addr-neighborhood">Barrio</Label>
                <Input
                  id="addr-neighborhood"
                  type="text"
                  placeholder="El Poblado"
                  value={addrNeighborhood}
                  onChange={(e) => setAddrNeighborhood(e.target.value)}
                  aria-invalid={!!addressErrors.neighborhood}
                />
                {addressErrors.neighborhood && (
                  <p className="text-sm text-destructive">{addressErrors.neighborhood}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="addr-city">Ciudad</Label>
                <Input
                  id="addr-city"
                  type="text"
                  placeholder="Medellín"
                  value={addrCity}
                  onChange={(e) => setAddrCity(e.target.value)}
                  aria-invalid={!!addressErrors.city}
                />
                {addressErrors.city && (
                  <p className="text-sm text-destructive">{addressErrors.city}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="addr-references">Referencias</Label>
                <Input
                  id="addr-references"
                  type="text"
                  placeholder="Apto 301"
                  value={addrReferences}
                  onChange={(e) => setAddrReferences(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-border px-5 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddressModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="button" onClick={handleSaveAddress}>
                Guardar dirección
              </Button>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}
