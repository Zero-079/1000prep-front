"use client"

import { useState } from "react"
import { CalendarCheck, Percent, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export function SidePanel() {
  const [infoOpen, setInfoOpen] = useState(false)

  return (
    <>
      <aside className="flex flex-col gap-4">
        {/* Today's menu CTA */}
        <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2.5 text-primary">
            <CalendarCheck className="size-5" />
            <h3 className="font-semibold text-foreground text-sm">Pedir Menu de Hoy</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Selecciona tus comidas favoritas y recibelas hoy antes de las 14:00 en tu domicilio.
          </p>
          <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 w-full" size="sm">
            Ver Menu Completo
          </Button>
        </div>

        {/* Subscription CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2.5 text-primary">
            <Percent className="size-5" />
            <h3 className="font-semibold text-foreground text-sm">Suscribete y Ahorra 20%</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Recibe tus comidas cada semana con un 20% de descuento. Sin permanencia, cancela cuando quieras.
          </p>
          <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary/10 w-full" size="sm">
            Ver Planes
          </Button>
        </div>

        {/* Info card */}
        <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <Info className="size-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground text-sm">Que es 1000Prep?</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Comida saludable preparada por chefs, con macros calculados por nutricionistas.
          </p>
          <Button
            variant="ghost"
            className="rounded-full text-primary hover:bg-primary/10 w-full"
            size="sm"
            onClick={() => setInfoOpen(true)}
          >
            Saber mas
          </Button>
        </div>
      </aside>

      {/* Info modal */}
      <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl font-bold text-foreground">Que es 1000Prep?</DialogTitle>
            <DialogDescription className="text-muted-foreground leading-relaxed text-base">
              1000Prep es tu aliado de nutricion inteligente.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              Preparamos comidas saludables con ingredientes frescos y de temporada, calculando los macronutrientes de cada plato con precision para que puedas alimentarte bien sin esfuerzo.
            </p>
            <p>
              Nuestro equipo de chefs y nutricionistas trabaja a diario para ofrecerte un menu variado, equilibrado y delicioso. Solo tienes que elegir, calentar y disfrutar.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="text-center p-3 bg-muted/50 rounded-xl">
                <p className="text-xl font-bold text-primary">500+</p>
                <p className="text-xs text-muted-foreground mt-0.5">Recetas</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-xl">
                <p className="text-xl font-bold text-primary">15 min</p>
                <p className="text-xs text-muted-foreground mt-0.5">Listas</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-xl">
                <p className="text-xl font-bold text-primary">10K+</p>
                <p className="text-xs text-muted-foreground mt-0.5">Clientes</p>
              </div>
            </div>
          </div>
          <Button
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
            onClick={() => setInfoOpen(false)}
          >
            Entendido
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
