import { z } from "zod"

// Schema for Step 1: Personal Data
export const step1PersonalSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Ingresa un correo válido"),
  phone: z
    .string()
    .min(1, "El teléfono es obligatorio")
    .regex(/^\d{7,15}$/, "El teléfono debe tener entre 7 y 15 dígitos"),
})

// Schema for address
export const addressSchema = z.object({
  label: z
    .string()
    .min(1, "El nombre de la dirección es obligatorio")
    .max(50, "El nombre no puede exceder 50 caracteres"),
  street: z
    .string()
    .min(1, "La calle es obligatoria")
    .min(5, "La calle debe tener al menos 5 caracteres")
    .max(100, "La calle no puede exceder 100 caracteres"),
  neighborhood: z
    .string()
    .min(1, "El barrio es obligatorio")
    .max(100, "El barrio no puede exceder 100 caracteres"),
  city: z
    .string()
    .min(1, "La ciudad es obligatoria")
    .max(100, "La ciudad no puede exceder 100 caracteres"),
  references: z
    .string()
    .max(200, "Las referencias no pueden exceder 200 caracteres")
    .optional()
    .or(z.literal("")),
})

// Schema for Step 2: Address (wrapped with address key)
export const step2AddressSchema = z.object({
  address: addressSchema,
})

// Schema for Step 3: Security
export const step3SecuritySchema = z
  .object({
    password: z
      .string()
      .min(1, "La contraseña es obligatoria")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(72, "La contraseña no puede exceder 72 caracteres"),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

// Full schema for registration - using extend instead of merge for the refined schema
export const fullRegisterSchema = step1PersonalSchema
  .extend({
    address: addressSchema,
  })
  .extend({
    password: z
      .string()
      .min(1, "La contraseña es obligatoria")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(72, "La contraseña no puede exceder 72 caracteres"),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

// TypeScript types inferred from schemas
export type Step1PersonalData = z.infer<typeof step1PersonalSchema>
export type AddressData = z.infer<typeof addressSchema>
export type Step2AddressData = z.infer<typeof step2AddressSchema>
export type Step3SecurityData = z.infer<typeof step3SecuritySchema>
export type RegisterFormData = z.infer<typeof fullRegisterSchema>