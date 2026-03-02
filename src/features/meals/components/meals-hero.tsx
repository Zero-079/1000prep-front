"use client"

export function MealsHero() {
  return (
    <section className="pt-32 pb-6 md:pt-40 md:pb-8 px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
          Nuestras <span className="text-primary">Comidas</span>
        </h1>
        <p className="mt-3 text-muted-foreground text-lg max-w-2xl">
          Explora el menu del dia, suscribete para ahorrar o descubre como trabajamos para cuidar tu alimentacion.
        </p>
      </div>
    </section>
  )
}
