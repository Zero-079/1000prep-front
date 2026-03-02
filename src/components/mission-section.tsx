"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 px-6">
      <div className="relative max-w-7xl mx-auto rounded-[48px] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-primary" />

        {/* Content */}
        <div className="relative px-8 lg:px-16 py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <p className="reveal opacity-0 text-sm uppercase tracking-[0.2em] text-primary-foreground/70 font-medium mb-4">
              Nuestra Mision
            </p>
            <h2 className="reveal opacity-0 animation-delay-200 font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground text-balance mb-8">
              Transformar la forma en que te alimentas, un plato a la vez
            </h2>
            <div className="reveal opacity-0 animation-delay-400 space-y-6 text-primary-foreground/85 leading-relaxed text-lg">
              <p>
                En 1000Prep creemos que una buena nutricion no deberia ser complicada. Nuestra mision es hacer accesible la alimentacion saludable y personalizada, combinando ciencia nutricional con la conveniencia que tu vida activa necesita.
              </p>
            </div>
            <div className="reveal opacity-0 animation-delay-600 mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 rounded-full px-8 group"
              >
                Empieza Ahora
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-primary-foreground/30 hover:bg-primary-foreground/10 text-primary-foreground bg-transparent"
              >
                Contactanos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
