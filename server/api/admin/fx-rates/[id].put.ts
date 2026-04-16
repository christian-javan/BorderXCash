import pool from '../../../utils/db'
import { FXRateRepository } from '../../../infrastructure/persistence/FXRateRepository'
import { FXController } from '../../../interfaces/controllers/FXController'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID required',
    })
  }

  const body = await readBody(event)
  const { rateStandard, rateTier1, rateTier2, rateTier3, validFrom, validUntil, notes } = body

  const fxRateRepository = new FXRateRepository(pool)
  const fxController = new FXController(fxRateRepository)
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