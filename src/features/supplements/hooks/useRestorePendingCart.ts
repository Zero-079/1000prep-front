// src/features/supplements/hooks/useRestorePendingCart.ts
"use client"

import { useEffect, useRef } from "react"
import { useAuthContext } from "@/features/auth/context/AuthContext"
import { useSupplementCart } from "@/features/supplements/context/supplements-cart-context"
import { supplementsService } from "@/features/supplements/services/supplements.service"

const CART_STORAGE_KEY = "supplement_cart_pending"

/**
 * Call this hook inside SupplementCartProvider (e.g. in the suplementos page).
 * After a successful login redirect, it reads the saved cart snapshot from
 * sessionStorage, fetches the supplement data and re-adds the items to the cart.
 */
export function useRestorePendingCart() {
  const { isAuthenticated, isLoading: authLoading } = useAuthContext()
  const { items, addItem } = useSupplementCart()
  const restored = useRef(false)

  useEffect(() => {
    // Only run once, after auth resolves and user is logged in
    if (authLoading || !isAuthenticated || restored.current) return

    const raw = sessionStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return

    // Mark as restored immediately so it doesn't run twice
    restored.current = true
    sessionStorage.removeItem(CART_STORAGE_KEY)

    let snapshot: Array<{ id: string; quantity: number }> = []
    try {
      snapshot = JSON.parse(raw)
    } catch {
      return
    }

    if (!snapshot.length) return

    // Fetch fresh supplement data and re-add to cart
    ;(async () => {
      try {
        const allSupplements = await supplementsService.getSupplements()
        snapshot.forEach(({ id, quantity }) => {
          const supplement = allSupplements.find((s) => s.id === id)
          if (supplement) {
            // Only add if not already in cart
            const alreadyInCart = items.some((i) => i.supplement.id === id)
            if (!alreadyInCart) {
              addItem(supplement, quantity)
            }
          }
        })
      } catch {
        // silently ignore — cart restore is best-effort
      }
    })()
  }, [isAuthenticated, authLoading]) // eslint-disable-line react-hooks/exhaustive-deps
}