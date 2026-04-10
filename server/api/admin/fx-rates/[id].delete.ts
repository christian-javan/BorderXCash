import { verifyAccessToken } from '../../../utils/auth'

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

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID required',
    })
  }

  const fxController = event.context.$fxController
  const deleted = await fxController.deleteFXRate(id)

  if (!deleted) {
    throw createError({
      statusCode: 404,
      statusMessage: 'FX rate not found',
    })
  }

  return { success: true, message: 'FX rate deleted' }
})