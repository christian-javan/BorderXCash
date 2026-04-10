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

  const fxRateRepository = new FXRateRepository(pool)
  const fxController = new FXController(fxRateRepository)
  const deleted = await fxController.deleteFXRate(id)

  if (!deleted) {
    throw createError({
      statusCode: 404,
      statusMessage: 'FX rate not found',
    })
  }

  return { success: true, message: 'FX rate deleted' }
})