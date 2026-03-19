// src/features/plans/components/login-required-modal.tsx
"use client"

import { useRouter } from "next/navigation"
import { LogIn, UserPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface LoginRequiredModalProps {
  open: boolean
  onClose: () => void
}

export function LoginRequiredModal({ open, onClose }: LoginRequiredModalProps) {
  const router = useRouter()

  const handleLogin = () => {
    onClose()
    router.push("/login")
  }

  const handleRegister = () => {
    onClose()
    router.push("/register")
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="text-xl font-semibold">
            Inicia sesión para suscribirte
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            Para elegir un plan necesitas tener una cuenta.
            Si aún no tienes una, ¡puedes crearla gratis!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col gap-2 sm:flex-col mt-2">
          <Button
            onClick={handleLogin}
            className="w-full rounded-full py-5 font-medium gap-2"
          >
            <LogIn className="w-4 h-4" />
            Ingresar
          </Button>
          <Button
            onClick={handleRegister}
            variant="outline"
            className="w-full rounded-full py-5 font-medium gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Registrarse
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
