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

  const body = await readBody(event)
  const { rateStandard, rateTier1, rateTier2, rateTier3, validFrom, validUntil, notes } = body

  const fxController = event.context.$fxController
  const updatedRate = await fxController.updateFXRate({
    id,
    rateStandard: rateStandard !== undefined ? parseFloat(rateStandard) : undefined,
    rateTier1: rateTier1 !== undefined ? parseFloat(rateTier1) : undefined,
    rateTier2: rateTier2 !== undefined ? parseFloat(rateTier2) : undefined,
    rateTier3: rateTier3 !== undefined ? parseFloat(rateTier3) : undefined,
    validFrom,
    validUntil,
    notes
  })

  if (!updatedRate) {
    throw createError({
      statusCode: 404,
      statusMessage: 'FX rate not found',
    })
  }

  return { success: true, data: updatedRate }
})