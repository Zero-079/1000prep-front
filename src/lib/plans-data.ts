export interface Plan {
  id: "weekly" | "biweekly" | "monthly"
  name: string
  frequency: string
  frequencyLabel: string
  basePrice: number
  subscriptionDiscount: number // porcentaje
  badge?: "popular" | "bestValue"
  benefits: string[]
  features: {
    personalizedNutrition?: boolean
    nutritionistConsultation?: boolean
  }
}

export interface FAQItem {
  question: string
  answer: string
}

export const plans: Plan[] = [
  {
    id: "weekly",
    name: "Semanal",
    frequency: "Cada semana",
    frequencyLabel: "semana",
    basePrice: 89000,
    subscriptionDiscount: 0,
    benefits: [
      "Menú del día completo",
      "Macros calculados por nutricionistas",
      "Entrega a domicilio incluida",
    ],
    features: {
      personalizedNutrition: false,
      nutritionistConsultation: false,
    },
  },
  {
    id: "biweekly",
    name: "Quincenal",
    frequency: "Cada 2 semanas",
    frequencyLabel: "dos semanas",
    basePrice: 178000,
    subscriptionDiscount: 10,
    badge: "popular",
    benefits: [
      "Menú del día completo",
      "Macros calculados por nutricionistas",
      "Entrega a domicilio incluida",
    ],
    features: {
      personalizedNutrition: false,
      nutritionistConsultation: false,
    },
  },
  {
    id: "monthly",
    name: "Mensual",
    frequency: "Cada mes",
    frequencyLabel: "mes",
    basePrice: 356000,
    subscriptionDiscount: 20,
    badge: "bestValue",
    benefits: [
      "Menú del día completo",
      "Macros calculados por nutricionistas",
      "Entrega a domicilio incluida",
      "Ajuste nutricional personalizado",
      "Consulta con nutricionista",
    ],
    features: {
      personalizedNutrition: true,
      nutritionistConsultation: true,
    },
  },
]

export const faqItems: FAQItem[] = [
  {
    question: "¿Puedo cancelar en cualquier momento?",
    answer:
      "Sí, puedes cancelar tu suscripción sin permanencia mínima. No hay multas ni penalidades. Solo notificamos con 3 días de anticipación para detener las entregas. En planes de Pago Único, el servicio se presta por el período pagado.",
  },
  {
    question: "¿Cómo funciona la entrega?",
    answer:
      "Las entregas se realizan a domicilio en Manizales y el área metropolitana. Los platos llegan en contenedores reutilizables y se entregan frescos. Puedes programar el día y hora preferida. Las entregas por suscripción son cada semana, cada 2 semanas o cada mes según tu plan.",
  },
  {
    question: "¿Puedo cambiar de plan?",
    answer:
      "Claro. Puedes cambiar de plan en cualquier momento. Si cambias a un plan más caro, se ajusta el costo proporcionalmente. Si cambias a uno más económico, el cambio toma efecto en el próximo ciclo de pago.",
  },
]