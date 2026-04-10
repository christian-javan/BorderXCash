import pool from '../../utils/db'
import { FXRateRepository } from '../../infrastructure/persistence/FXRateRepository'
import { FXController } from '../../interfaces/controllers/FXController'

export default defineEventHandler(async (event) => {
  // Auth disabled for testing
  const fxRateRepository = new FXRateRepository(pool)
  const fxController = new FXController(fxRateRepository)
  const rates = await fxController.getAllFXRates()

  return { success: true, data: rates }
})