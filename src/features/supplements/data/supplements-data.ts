// src/features/supplements/data/supplements-data.ts

import type { Supplement } from "../types/supplement"

export const SUPPLEMENTS_DATA: Supplement[] = [
  {
    id: "1",
    name: "Whey Protein Gold",
    category: "Proteína",
    description:
      "Proteína de suero de alta calidad con 24g de proteína por porción. Ideal para recuperación muscular post-entrenamiento y aumento de masa magra.",
    image: "/images/whey.jpg",
    flavors: ["Chocolate", "Vainilla", "Fresa"],
    presentations: [
      { size: "1kg", price: 89000 },
      { size: "2kg", price: 159000 },
    ],
    benefits: ["Sin azúcar añadida", "Libre de gluten", "25 porciones"],
    inStock: true,
  },
  {
    id: "2",
    name: "Creatina Monohidrato",
    category: "Creatina",
    description:
      "Creatina pura para maximizar fuerza y rendimiento muscular. Respaldada por más de 500 estudios científicos.",
    image: "/images/creatine.jpg",
    flavors: ["Sin sabor"],
    presentations: [
      { size: "300g", price: 45000 },
      { size: "500g", price: 69000 },
    ],
    benefits: ["100% pura", "Sin aditivos", "60 porciones"],
    inStock: true,
  },
  {
    id: "3",
    name: "Vitamina D3 + K2",
    category: "Vitaminas",
    description:
      "Combinación sinérgica de Vitamina D3 y K2 para salud ósea, inmunidad y función cardiovascular óptima.",
    image: "/images/vitamins.jpg",
    flavors: ["Sin sabor"],
    presentations: [
      { size: "60 cápsulas", price: 38000 },
      { size: "120 cápsulas", price: 65000 },
    ],
    benefits: ["Alta biodisponibilidad", "Sin alérgenos comunes", "Dosis clínica"],
    inStock: true,
  },
  {
    id: "4",
    name: "Pre-Entreno Explosive",
    category: "Pre-entreno",
    description:
      "Fórmula pre-entreno con cafeína, beta-alanina y citrulina para energía explosiva, enfoque mental y máximo rendimiento.",
    image: "/images/pre-work.jpg",
    flavors: ["Sandía", "Maracuyá", "Limón"],
    presentations: [
      { size: "300g", price: 72000 },
    ],
    benefits: ["200mg cafeína", "Sin azúcar", "30 servicios"],
    inStock: true,
  },
  {
    id: "5",
    name: "BCAA Recovery",
    category: "Recuperación",
    description:
      "Aminoácidos de cadena ramificada 2:1:1 para acelerar la recuperación muscular y reducir el daño post-entrenamiento.",
    image: "/images/bcaa.jpg",
    flavors: ["Frutos Rojos", "Limón", "Sin sabor"],
    presentations: [
      { size: "250g", price: 48000 },
      { size: "500g", price: 85000 },
    ],
    benefits: ["Ratio 2:1:1 óptimo", "Electrolitos incluidos", "40 servicios"],
    inStock: true,
  },
  {
    id: "6",
    name: "Omega 3 Premium",
    category: "Vitaminas",
    description:
      "Aceite de pescado de aguas profundas con alta concentración de EPA y DHA para salud cardiovascular y cognitiva.",
    image: "/images/omega3.jpg",
    flavors: ["Sin sabor"],
    presentations: [
      { size: "90 cápsulas", price: 42000 },
      { size: "180 cápsulas", price: 75000 },
    ],
    benefits: ["1000mg por cápsula", "Libre de metales pesados", "Certificado IFOS"],
    inStock: true,
  },
]
