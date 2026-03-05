"use client"

import { useState } from "react"
import { Percent, Info, ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import type { HeaderUser } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/features/meals/context/cart-context"
import { MealsHero } from "@/features/meals/components/meals-hero"
import { MealsFilter } from "@/features/meals/components/meals-filter" // ✅ NUEVO
import { MealDetailModal } from "@/features/meals/components/meal-detail-modal"
import { MiniCart } from "@/features/meals/components/mini-cart"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

// Importar hook
import { useMeals } from "@/features/meals/hooks/useMeals"
import type { Meal } from "@/features/meals/types/meal"

export default function MilprepPage() {
  const [user, setUser] = useState<HeaderUser | null>(null)
  const [detailMeal, setDetailMeal] = useState<Meal | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)

  // Obtener datos del backend
  const { meals, isLoading, error } = useMeals()

  const openDetail = (meal: Meal) => {
    setDetailMeal(meal)
    setDetailOpen(true)
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-muted/40">
        <Header />

        <MealsHero />

        <section className="px-6 lg:px-8 py-8 pb-20">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            {/* ✅ NUEVO: MealsFilter encapsula toda la lógica de filtrado */}
            <MealsFilter
              meals={meals}
              onOpenDetail={openDetail}
              isLoading={isLoading}
              error={error}
            />

            {/* ──────────────────────────────────────────────
                Card 2 & Card 3 — side by side (INTACTAS)
            ────────────────────────────────────────────── */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Card 2 — Suscribirme */}
              <div className="bg-card rounded-3xl border border-border shadow-md p-8 flex flex-col gap-5 relative overflow-hidden">
                <div className="absolute -top-16 -right-16 size-40 rounded-full bg-primary/5" />

                <div className="flex items-center gap-3 relative">
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Percent className="size-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    Suscribirme
                  </h2>
                </div>

                <p className="text-muted-foreground leading-relaxed relative">
                  Recibe tus comidas cada semana con un{" "}
                  <span className="font-semibold text-primary">
                    20% de descuento
                  </span>
                  . Sin permanencia, cancela cuando quieras.
                </p>

                <div className="flex items-center gap-4 pt-2 relative">
                  <div className="flex flex-col items-center gap-1 flex-1 bg-primary/5 rounded-2xl py-4">
                    <span className="text-2xl font-bold text-primary">20%</span>
                    <span className="text-xs text-muted-foreground">
                      Descuento
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 flex-1 bg-primary/5 rounded-2xl py-4">
                    <span className="text-2xl font-bold text-primary">0</span>
                    <span className="text-xs text-muted-foreground">
                      Permanencia
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 flex-1 bg-primary/5 rounded-2xl py-4">
                    <span className="text-2xl font-bold text-primary">7d</span>
                    <span className="text-xs text-muted-foreground">
                      Entrega
                    </span>
                  </div>
                </div>

                <Button
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 mt-auto gap-2"
                  size="lg"
                  asChild
                >
                  <a href="/planes">
                    Ver Planes
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </div>

              {/* Card 3 — Que es 1000Prep? */}
              <div className="bg-card rounded-3xl border border-border shadow-md p-8 flex flex-col gap-5 relative overflow-hidden">
                <div className="absolute -bottom-16 -left-16 size-40 rounded-full bg-primary/5" />

                <div className="flex items-center gap-3 relative">
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Info className="size-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    ¿Que es 1000Prep?
                  </h2>
                </div>

                <p className="text-muted-foreground leading-relaxed relative">
                  Comida saludable preparada por chefs, con macros calculados
                  por nutricionistas. Tu alimentacion, simplificada.
                </p>

                <div className="grid grid-cols-3 gap-3 relative">
                  <div className="text-center p-4 bg-muted/50 rounded-2xl">
                    <p className="text-xl font-bold text-primary">500+</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Recetas
                    </p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-2xl">
                    <p className="text-xl font-bold text-primary">15 min</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Listas
                    </p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-2xl">
                    <p className="text-xl font-bold text-primary">10K+</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Clientes
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary/10 mt-auto gap-2"
                  size="lg"
                  onClick={() => setInfoOpen(true)}
                >
                  Saber Mas
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Modales */}
        <MealDetailModal
          meal={detailMeal}
          open={detailOpen}
          onOpenChange={setDetailOpen}
        />

        <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
          <DialogContent className="sm:max-w-lg rounded-2xl">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl font-bold text-foreground">
                ¿Que es 1000Prep?
              </DialogTitle>
              <DialogDescription className="text-muted-foreground leading-relaxed text-base">
                1000Prep es tu aliado de nutricion inteligente.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Preparamos comidas saludables con ingredientes frescos y de
                temporada, calculando los macronutrientes de cada plato con
                precision para que puedas alimentarte bien sin esfuerzo.
              </p>
              <p>
                Nuestro equipo de chefs y nutricionistas trabaja a diario para
                ofrecerte un menu variado, equilibrado y delicioso. Solo tienes
                que elegir, calentar y disfrutar.
              </p>
            </div>
            <Button
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
              onClick={() => setInfoOpen(false)}
            >
              Entendido
            </Button>
          </DialogContent>
        </Dialog>

        <MiniCart />
        <Footer />
      </div>
    </CartProvider>
  )
}
