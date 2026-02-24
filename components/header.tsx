"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6">
      <nav className="max-w-7xl mx-auto bg-background/80 backdrop-blur-md border border-border/50 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-sans text-sm font-bold">1K</span>
            </div>
            <span className="font-serif text-foreground text-xl md:text-2xl font-semibold">1000Prep</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#inicio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Inicio
            </Link>
            <Link href="#comidas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Comidas
            </Link>
            <Link href="#suplementos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Suplementos
            </Link>
            <Link href="#nutricionista" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Nutricionista
            </Link>
            <Link href="#contacto" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contacto
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-foreground hover:bg-muted rounded-full px-5" asChild>
              <Link href="/login">Ingresar</Link>
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5" asChild>
              <Link href="/register">Registrarse</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menu de navegacion"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 px-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              <Link
                href="#inicio"
                className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="#comidas"
                className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Comidas
              </Link>
              <Link
                href="#suplementos"
                className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Suplementos
              </Link>
              <Link
                href="#nutricionista"
                className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Nutricionista
              </Link>
              <Link
                href="#contacto"
                className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contacto
              </Link>
              <div className="flex flex-col gap-3 mt-4">
                <Button variant="outline" className="rounded-full w-full" asChild>
                  <Link href="/login">Ingresar</Link>
                </Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full w-full" asChild>
                  <Link href="/register">Registrarse</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
