"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Meal, CartItem } from "@/lib/meals-data"

interface CartContextType {
  items: CartItem[]
  addItem: (meal: Meal, quantity?: number) => void
  removeItem: (mealId: string) => void
  updateQuantity: (mealId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((meal: Meal, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.meal.id === meal.id)
      if (existing) {
        return prev.map((item) =>
          item.meal.id === meal.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...prev, { meal, quantity }]
    })
  }, [])

  const removeItem = useCallback((mealId: string) => {
    setItems((prev) => prev.filter((item) => item.meal.id !== mealId))
  }, [])

  const updateQuantity = useCallback((mealId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.meal.id !== mealId))
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.meal.id === mealId ? { ...item, quantity } : item))
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.meal.subscriptionPrice * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
