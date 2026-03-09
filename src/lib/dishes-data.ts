export interface Dish {
  id: string
  name: string
  description: string
  mealType: "Desayuno" | "Almuerzo" | "Cena" | "Snack"
  imageUrl: string
  isRecommended?: boolean
}

export const dishes: Dish[] = [
  {
    id: "1",
    name: "Pollo a la Mostaza con Quinoa",
    description: "Pechuga de pollo jugosa con salsa de mostaza dijon y quinoa integral",
    mealType: "Almuerzo",
    imageUrl:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
    isRecommended: true,
  },
  {
    id: "2",
    name: "Salmón al Horno con Vegetales",
    description: "Filete de salmón fresco con brócoli, zanahorias y camote asados",
    mealType: "Almuerzo",
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Bowl de Desayuno Power",
    description: "Avena con frutas rojas, frutos secos, miel de abeja y granola casera",
    mealType: "Desayuno",
    imageUrl:
      "https://images.unsplash.com/photo-1590080876-ce4b8d61ffd9?w=400&h=300&fit=crop",
  },
]
