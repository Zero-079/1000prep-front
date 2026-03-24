import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductSection } from "@/components/product-section"
import { ScienceSection } from "@/components/science-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

import { useAuth } from '@/features/auth/hooks/useAuth'
import { LoginForm } from '@/features/auth/components'
import type { LoginFormData } from '@/features/auth/components'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProductSection />
      <ScienceSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}

export function LoginPage() {
  const { login, isLoading, error } = useAuth()

  async function handleLogin(data: LoginFormData) {
    try {
      await login(data)
    } catch (err) {
      // El error ya está en el estado, el componente puede mostrarlo
      console.error('Login error:', err)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground text-balance">
          Bienvenido de vuelta
        </h1>
        <p className="text-muted-foreground">
          Inicia sesion para acceder a tu plan nutricional.
        </p>
      </div>
      
      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <LoginForm onLogin={handleLogin} />
    </div>
  )
}
