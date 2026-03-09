// src/features/supplements/context/supplements-cart-context.tsx
"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import type {
  Supplement,
  SupplementCartItem,
  SupplementPresentation,
} from "../types/supplement"

interface SupplementCartContextType {
  items: SupplementCartItem[]
  addItem: (
    supplement: Supplement,
    flavor: string,
    presentation: SupplementPresentation,
    quantity?: number
  ) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

// Clave única por suplemento+sabor+presentación
function itemKey(supplementId: string, flavor: string, size: string) {
  return `${supplementId}__${flavor}__${size}`
}

const SupplementCartContext = createContext<SupplementCartContextType | null>(null)

export function SupplementCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SupplementCartItem[]>([])

  const addItem = useCallback(
    (
      supplement: Supplement,
      flavor: string,
      presentation: SupplementPresentation,
      quantity = 1
    ) => {
      const key = itemKey(supplement.id, flavor, presentation.size)
      setItems((prev) => {
        const existing = prev.find(
          (i) =>
            i.supplement.id === supplement.id &&
            i.flavor === flavor &&
            i.presentation.size === presentation.size
        )
        if (existing) {
          return prev.map((i) =>
            itemKey(i.supplement.id, i.flavor, i.presentation.size) === key
              ? { ...i, quantity: i.quantity + quantity }
              : i
          )
        }
        return [...prev, { supplement, flavor, presentation, quantity }]
      })
    },
    []
  )

  const removeItem = useCallback((key: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => itemKey(i.supplement.id, i.flavor, i.presentation.size) !== key
      )
    )
  }, [])

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) =>
        prev.filter(
          (i) => itemKey(i.supplement.id, i.flavor, i.presentation.size) !== key
        )
      )
      return
    }
    setItems((prev) =>
      prev.map((i) =>
        itemKey(i.supplement.id, i.flavor, i.presentation.size) === key
          ? { ...i, quantity }
          : i
      )
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce(
    (sum, i) => sum + i.presentation.price * i.quantity,
    0
  )

  return (
    <SupplementCartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </SupplementCartContext.Provider>
  )
}

export function useSupplementCart() {
  const ctx = useContext(SupplementCartContext)
  if (!ctx)
    throw new Error(
      "useSupplementCart must be used within SupplementCartProvider"
    )
  return ctx
}

export { itemKey }
