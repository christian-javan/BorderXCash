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

  const body = await readBody(event)
  const { rateStandard, rateTier1, rateTier2, rateTier3, validFrom, validUntil, notes } = body

  const fxController = event.context.$fxController
  const newRate = await fxController.createFXRate({
    rateStandard: parseFloat(rateStandard),
    rateTier1: parseFloat(rateTier1),
    rateTier2: parseFloat(rateTier2),
    rateTier3: parseFloat(rateTier3),
    updatedById: payload.userId,
    validFrom,
    validUntil,
    notes
  })

  return { success: true, data: newRate }
})