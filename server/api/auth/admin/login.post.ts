import type { AdminLoginDto } from '../../../utils/validators'
import { AdminLoginSchema } from '../../../utils/validators'
import pool from '../../../utils/db'
import { SystemUserRepository } from '../../../infrastructure/persistence/SystemUserRepository'
import { AuthController } from '../../../interfaces/controllers/AuthController'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedData = AdminLoginSchema.parse(body) as AdminLoginDto

    const systemUserRepository = new SystemUserRepository(pool)
    const authController = new AuthController(systemUserRepository)
    const result = await authController.adminLogin(validatedData)

    // Set refresh token in httpOnly cookie
    setCookie(event, 'refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    // Return only access token and user data
    return {
      success: true,
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    }
  } catch (error) {
    if (error instanceof Error) {
      throw createError({
        statusCode: 401,
        statusMessage: error.message,
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})