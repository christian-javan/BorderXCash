import { z } from 'zod'

export const AdminLoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(7, 'La contraseña debe tener al menos 7 caracteres'),
})

export const RefreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token requerido'),
})

export type AdminLoginDto = z.infer<typeof AdminLoginSchema>
export type RefreshTokenDto = z.infer<typeof RefreshTokenSchema>