import Link from "next/link"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-center justify-center p-12 overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 size-64 rounded-full border border-primary-foreground/20" />
          <div className="absolute bottom-20 right-20 size-96 rounded-full border border-primary-foreground/20" />
          <div className="absolute top-1/2 left-1/3 size-48 rounded-full border border-primary-foreground/20" />
        </div>

        <div className="relative z-10 max-w-md text-center flex flex-col items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-12 rounded-xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-primary-foreground font-sans text-lg font-bold">1K</span>
            </div>
            <span className="font-serif text-primary-foreground text-3xl font-semibold">1000Prep</span>
          </Link>
          <h2 className="text-primary-foreground text-2xl font-serif font-semibold leading-relaxed text-balance">
            Comida saludable, preparada con precision nutricional
          </h2>
          <p className="text-primary-foreground/80 leading-relaxed">
            Comidas con macros exactos, suplementos de calidad y asesoria profesional para alcanzar tus objetivos.
          </p>
          <div className="flex items-center gap-6 mt-4">
            <div className="text-center">
              <p className="text-primary-foreground text-2xl font-bold">500+</p>
              <p className="text-primary-foreground/70 text-sm">Recetas</p>
            </div>
            <div className="h-8 w-px bg-primary-foreground/20" />
            <div className="text-center">
              <p className="text-primary-foreground text-2xl font-bold">10K+</p>
              <p className="text-primary-foreground/70 text-sm">Clientes</p>
            </div>
            <div className="h-8 w-px bg-primary-foreground/20" />
            <div className="text-center">
              <p className="text-primary-foreground text-2xl font-bold">100%</p>
              <p className="text-primary-foreground/70 text-sm">Puntualidad</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="size-9 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-sans text-sm font-bold">1K</span>
              </div>
              <span className="font-serif text-foreground text-2xl font-semibold">1000Prep</span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
