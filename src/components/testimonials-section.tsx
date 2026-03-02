"use client"

import { useEffect, useRef } from "react"
import { ScrollBlurText } from "./scroll-blur-text"

const testimonials = [
  {
    quote:
      "Desde que uso 1000Prep, he perdido 8 kilos sin pasar hambre. Las comidas son deliciosas y los macros estan perfectamente calculados.",
    author: "Carlos M.",
    role: "Usuario por 6 meses",
  },
  {
    quote:
      "Como deportista, necesito una alimentacion precisa. 1000Prep me ahorra horas de preparacion y me asegura que estoy comiendo exactamente lo que necesito.",
    author: "Ana R.",
    role: "Atleta amateur",
  },
  {
    quote:
      "La asesoria nutricional fue un cambio total. Mi nutricionista me diseño un plan perfecto y las comidas llegan listas.",
    author: "Miguel T.",
    role: "Usuario por 1 año",
  },
  {
    quote: "Los suplementos son de excelente calidad y los precios son mucho mejores que en las tiendas. Recomendadisimo.",
    author: "Laura S.",
    role: "Usuario por 4 meses",
  },
  {
    quote: "Nunca pense que comer saludable fuera tan facil. 1000Prep transformo mi rutina completamente.",
    author: "Diego P.",
    role: "Usuario por 8 meses",
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5

    const animate = () => {
      scrollPosition += scrollSpeed
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }
      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    const handleMouseEnter = () => cancelAnimationFrame(animationId)
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate)
    }

    scrollContainer.addEventListener("mouseenter", handleMouseEnter)
    scrollContainer.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter)
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const duplicatedTestimonials = [...testimonials, ...testimonials]

  return (
    <section ref={sectionRef} id="nutricionista" className="py-24 bg-background overflow-hidden lg:py-32 lg:pb-0">
      <div className="w-full">
        <div className="text-center mb-16 lg:mb-20 px-6">
          <p className="reveal opacity-0 text-sm uppercase tracking-[0.2em] text-secondary font-medium mb-4">
            Testimonios
          </p>
          <ScrollBlurText
            text="Lo que dicen nuestros clientes"
            className="font-serif text-3xl md:text-4xl text-foreground text-balance lg:text-7xl font-semibold"
          />
        </div>

        <div className="reveal opacity-0 animation-delay-400">
          <div ref={scrollRef} className="flex gap-6 overflow-x-hidden" style={{ scrollBehavior: "auto" }}>
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[320px] md:w-[380px] bg-card rounded-2xl p-6 border border-border/50 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 my-6 py-10"
              >
                <blockquote className="font-serif text-base md:text-lg text-foreground leading-relaxed mb-6">
                  {`"${testimonial.quote}"`}
                </blockquote>

                <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">
                      {testimonial.author.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-sm text-foreground">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
