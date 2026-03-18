"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, User, Settings, ShoppingCart, Package, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/features/auth/hooks/useAuth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { is } from "date-fns/locale"


export interface HeaderUser {
  name: string
  email: string
  avatarUrl?: string
}


function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/1000prep", label: "1000Prep" },
  { href: "/suplementos", label: "Suplementos" },
  { href: "/#nutricionista", label: "Nutricionista" },
]

export function Header(){
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, isAuthLoading, logout } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6">
      <nav className="max-w-7xl mx-auto bg-background/80 backdrop-blur-md border border-border/50 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image 
            src="/logo_1000prep_nobg.png" 
            alt="1000Prep Logo" 
            width={120} 
            height={32} 
            priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthLoading ? (
              <div className="flex items-center gap-3">
                <div className="h-9 w-20 rounded-full bg-muted animate-pulse" />
                <div className="h-9 w-24 rounded-full bg-muted animate-pulse" />
              </div>
            ) : isAuthenticated && user ? (
              <AccountMenu user={{ name: user.name, email: user.email }}
              onLogout={logout} />
            ) : (
              <>
                <Button variant="ghost" className="text-foreground hover:bg-muted rounded-full px-5" asChild>
                  <Link href="/login">Ingresar</Link>
                </Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5" asChild>
                  <Link href="/register">Registrarse</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Right Side */}
          <div className="flex md:hidden items-center gap-2">
            {!isAuthLoading && isAuthenticated && user && (
              <AccountMenu user={{ name: user.name, email: user.email }} onLogout={logout} mobile />
            )}
            <button
              className="p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Abrir menu de navegacion"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 px-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {isAuthLoading ? (
                <div className="flex flex-col gap-3 mt-4 opacity-0 pointer-events-none" aria-hidden>
                  <div className="h-10 w-full rounded-full bg-muted" />
                  <div className="h-10 w-full rounded-full bg-muted" />
                </div>
              ) : isAuthenticated && user ? (
                <div className="flex flex-col gap-1 mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-3 px-1 mb-3">
                    <Avatar className="size-9">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                  <MobileMenuItem
                    href="/cuenta"
                    icon={<Settings className="size-4" />}
                    label="Mi cuenta / Configuracion"
                    onClick={() => setIsOpen(false)}
                  />
                  <MobileMenuItem
                    href="/pedidos"
                    icon={<Package className="size-4" />}
                    label="Mis pedidos"
                    onClick={() => setIsOpen(false)}
                  />
                  <MobileMenuItem
                    href="/carrito"
                    icon={<ShoppingCart className="size-4" />}
                    label="Carrito"
                    onClick={() => setIsOpen(false)}
                  />
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      logout()
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors text-sm"
                  >
                    <LogOut className="size-4" />
                    Cerrar sesion
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 mt-4">
                  <Button variant="outline" className="rounded-full w-full" asChild>
                    <Link href="/login">Ingresar</Link>
                  </Button>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full w-full" asChild>
                    <Link href="/register">Registrarse</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/*  Account dropdown (desktop + mobile trigger)                        */
/* ------------------------------------------------------------------ */

function AccountMenu({
  user,
  onLogout,
  mobile = false,
}: {
  user: HeaderUser
  onLogout?: () => void
  mobile?: boolean
}) {
  if (mobile) {
    return null // mobile uses the inline list above instead
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2.5 rounded-full border border-border/60 bg-background/60 px-2.5 py-1.5 hover:bg-muted/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Avatar className="size-8">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground max-w-[120px] truncate hidden lg:inline">
            {user.name}
          </span>
          <ChevronDown className="size-3.5 text-muted-foreground hidden lg:block" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-64 rounded-xl p-1.5">
        {/* User info header */}
        <DropdownMenuLabel className="px-3 py-2.5 font-normal">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">{user.name}</span>
              <span className="text-xs text-muted-foreground font-normal">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="rounded-lg px-3 py-2.5 cursor-pointer">
            <Link href="/cuenta">
              <Settings className="size-4" />
              <span>Mi cuenta</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="rounded-lg px-3 py-2.5 cursor-pointer">
            <Link href="/pedidos">
              <Package className="size-4" />
              <span>Mis pedidos</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="rounded-lg px-3 py-2.5 cursor-pointer">
            <Link href="/carrito">
              <ShoppingCart className="size-4" />
              <span>Carrito</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          className="rounded-lg px-3 py-2.5 cursor-pointer"
          onClick={onLogout}
        >
          <LogOut className="size-4" />
          <span>Cerrar sesion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ------------------------------------------------------------------ */
/*  Mobile menu row                                                    */
/* ------------------------------------------------------------------ */

function MobileMenuItem({
  href,
  icon,
  label,
  onClick,
}: {
  href: string
  icon: React.ReactNode
  label: string
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground hover:bg-muted transition-colors text-sm"
    >
      {icon}
      {label}
    </Link>
  )
}
