// src/features/supplements/types/supplement.ts

export interface SupplementPresentation {
  size: string
  price: number
}

export type SupplementCategory =
  | "Todos"
  | "Proteína"
  | "Vitaminas"
  | "Creatina"
  | "Pre-entreno"
  | "Recuperación"

export interface Supplement {
  id: string
  name: string
  category: Exclude<SupplementCategory, "Todos">
  description: string
  image: string | null
  flavors: string[]
  presentations: SupplementPresentation[]
  benefits: string[]
  inStock: boolean
}

export interface SupplementCartItem {
  supplement: Supplement
  flavor: string
  presentation: SupplementPresentation
  quantity: number
}
