import { verifyAccessToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  // Check auth
  const authHeader = getHeader(event, 'authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'No token provided',
    })
  }

  const payload = verifyAccessToken(token)
  if (!payload) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token',
    })
  }

  const fxController = event.context.$fxController
  const rates = await fxController.getAllFXRates()

  return { success: true, data: rates }
})