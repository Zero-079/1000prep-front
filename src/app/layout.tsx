import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "../features/auth/context/AuthContext"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
})

export const metadata: Metadata = {
  title: "1000Prep — Comida Saludable, Preparada con Precision Nutricional",
  description:
    "Comidas preparadas con macros exactos, suplementos deportivos de calidad y asesoria nutricional profesional. Empieza tu transformacion hoy.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${playfairDisplay.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
