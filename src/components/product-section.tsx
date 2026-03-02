"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/src/components/ui/button"
import { ArrowRight, UtensilsCrossed, Dumbbell, Stethoscope } from "lucide-react"
import { ScrollBlurText } from "@/src/components/scroll-blur-text"

const services = [
  {
    icon: UtensilsCrossed,
    name: "Menu Diario",
    description: "Comidas preparadas con macros exactos, suscripciones flexibles adaptadas a tus objetivos nutricionales.",
    image: "/images/card-meals.jpg",
    tag: "1000Prep Comidas",
    cta: "Ver Menu",
  },
  {
    icon: Dumbbell,
    name: "Suplementos",
    description: "Productos deportivos de calidad y precios preferenciales. Proteinas, vitaminas y mas para potenciar tu rendimiento.",
    image: "/images/card-supplements.jpg",
    tag: "Suplementacion",
    cta: "Explorar Catalogo",
  },
  {
    icon: Stethoscope,
    name: "Asesoria Profesional",
    description: "Citas con nutricionistas expertos. Planes personalizados diseñados para tus necesidades y metas.",
    image: "/images/card-nutritionist.jpg",
    tag: "Nutricionista",
    cta: "Agendar Cita",
  },
]

export function ProductSection() {
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
    <section ref={sectionRef} id="1000prep" className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="reveal opacity-0 text-sm uppercase tracking-[0.2em] text-secondary font-medium mb-4">
            Nuestros Servicios
          </p>
          <ScrollBlurText
            text="Todo para tu nutricion"
            className="font-serif text-3xl text-foreground text-balance mb-6 md:text-6xl lg:text-7xl font-semibold"
          />
          <p className="reveal opacity-0 animation-delay-400 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Un enfoque integral para tu alimentacion: comidas preparadas, suplementos de calidad y asesoria profesional.
          </p>
        </div>

        {/* Service Cards */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible -mx-6 px-6 lg:mx-0">
          {services.map((service, index) => (
            <div
              key={service.name}
              className={`reveal opacity-0 ${index === 1 ? "animation-delay-200" : index === 2 ? "animation-delay-400" : ""} group min-w-[85vw] md:min-w-[70vw] lg:min-w-0 snap-center`}
            >
              <div className="bg-card rounded-3xl overflow-hidden border border-border/50 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1.5 rounded-full z-10">
                    {service.tag}
                  </span>
                </div>
                {/* Content */}
                <div className="p-6 lg:p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <service.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-foreground text-2xl md:text-3xl font-semibold">{service.name}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-1">{service.description}</p>
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full group/btn w-full"
                  >
                    {service.cta}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
