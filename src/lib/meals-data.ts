export interface Meal {
  id: string
  name: string
  description: string
  image: string
  price: number
  subscriptionPrice: number
  protein: number
  carbs: number
  fat: number
  calories: number
  tags: string[]
  rating: number
  reviews: number
  ingredients: string[]
  allergens: string[]
}

export interface CartItem {
  meal: Meal
  quantity: number
}

export const meals: Meal[] = [
  {
    id: "pollo-quinoa",
    name: "Pollo a la Plancha con Quinoa",
    description: "Pechuga de pollo marinada, quinoa esponjosa, brocoli al vapor y tomates cherry.",
    image: "/images/meal-1.jpg",
    price: 11.90,
    subscriptionPrice: 9.50,
    protein: 42,
    carbs: 35,
    fat: 12,
    calories: 420,
    tags: ["Alto en Proteina", "Sin Gluten"],
    rating: 4.8,
    reviews: 124,
    ingredients: ["Pechuga de pollo", "Quinoa", "Brocoli", "Tomate cherry", "Aceite de oliva", "Limon", "Ajo", "Oregano"],
    allergens: [],
  },
  {
    id: "salmon-arroz",
    name: "Salmon con Arroz Integral",
    description: "Filete de salmon al horno, arroz integral, esparragos trigueros y limon.",
    image: "/images/meal-2.jpg",
    price: 13.90,
    subscriptionPrice: 11.10,
    protein: 38,
    carbs: 40,
    fat: 18,
    calories: 480,
    tags: ["Alto en Proteina"],
    rating: 4.9,
    reviews: 98,
    ingredients: ["Salmon fresco", "Arroz integral", "Esparragos", "Limon", "Eneldo", "Aceite de oliva", "Sal rosa"],
    allergens: ["Pescado"],
  },
  {
    id: "buddha-bowl",
    name: "Buddha Bowl Vegano",
    description: "Garbanzos especiados, aguacate, col morada, edamame y salsa tahini.",
    image: "/images/meal-3.jpg",
    price: 10.90,
    subscriptionPrice: 8.70,
    protein: 22,
    carbs: 48,
    fat: 20,
    calories: 460,
    tags: ["Vegano", "Sin Gluten"],
    rating: 4.7,
    reviews: 87,
    ingredients: ["Garbanzos", "Aguacate", "Col morada", "Zanahoria", "Edamame", "Tahini", "Limon", "Comino"],
    allergens: ["Sesamo"],
  },
  {
    id: "ternera-stir-fry",
    name: "Ternera Salteada con Verduras",
    description: "Tiras de ternera magra con pimientos, tirabeques y arroz jazmin.",
    image: "/images/meal-4.jpg",
    price: 12.90,
    subscriptionPrice: 10.30,
    protein: 36,
    carbs: 42,
    fat: 14,
    calories: 440,
    tags: ["Alto en Proteina"],
    rating: 4.6,
    reviews: 72,
    ingredients: ["Ternera magra", "Pimiento rojo", "Pimiento verde", "Tirabeques", "Arroz jazmin", "Salsa de soja", "Jengibre", "Sesamo"],
    allergens: ["Soja", "Sesamo"],
  },
  {
    id: "albondigas-pavo",
    name: "Albondigas de Pavo con Pasta",
    description: "Albondigas caseras de pavo en salsa de tomate con espaguetis integrales.",
    image: "/images/meal-5.jpg",
    price: 11.50,
    subscriptionPrice: 9.20,
    protein: 34,
    carbs: 46,
    fat: 16,
    calories: 465,
    tags: ["Bajo en Calorias"],
    rating: 4.5,
    reviews: 65,
    ingredients: ["Pavo molido", "Espaguetis integrales", "Tomate natural", "Albahaca", "Ajo", "Cebolla", "Judias verdes"],
    allergens: ["Gluten"],
  },
  {
    id: "gambas-tropical",
    name: "Gambas al Ajillo con Arroz Tropical",
    description: "Gambas a la plancha con frijoles negros, maiz, mango y arroz con cilantro.",
    image: "/images/meal-6.jpg",
    price: 13.50,
    subscriptionPrice: 10.80,
    protein: 30,
    carbs: 50,
    fat: 10,
    calories: 410,
    tags: ["Bajo en Calorias", "Sin Gluten"],
    rating: 4.8,
    reviews: 91,
    ingredients: ["Gambas", "Frijoles negros", "Maiz dulce", "Mango", "Cilantro", "Arroz basmati", "Lima", "Ajo"],
    allergens: ["Crustaceos"],
  },
]

export const filterOptions = [
  "Todos",
  "Alto en Proteina",
  "Bajo en Calorias",
  "Vegano",
  "Sin Gluten",
] as const

export type FilterOption = (typeof filterOptions)[number]
