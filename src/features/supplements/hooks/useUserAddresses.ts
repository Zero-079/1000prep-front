// src/features/supplements/hooks/useUserAddresses.ts
"use client"

import { useState, useEffect, useCallback } from "react"
import { fetchAPI } from "@/config/api"

export interface UserAddress {
  id: string
  label: string
  street: string
  city: string
  state: string
  zipCode?: string
  country: string
  isDefault: boolean
}

interface UseUserAddressesReturn {
  addresses: UserAddress[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useUserAddresses(): UseUserAddressesReturn {
  const [addresses, setAddresses] = useState<UserAddress[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAddresses = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchAPI<UserAddress[]>("/users/me/addresses", {
        method: "GET",
      })
      setAddresses(data)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al cargar direcciones"
      setError(message)
      console.error("[useUserAddresses] Error:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAddresses()
  }, [fetchAddresses])

  return { addresses, isLoading, error, refetch: fetchAddresses }
}