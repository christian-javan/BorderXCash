import pool from '../../utils/db'
import { FXRateRepository } from '../../infrastructure/persistence/FXRateRepository'
import { FXController } from '../../interfaces/controllers/FXController'

export default defineEventHandler(async (event) => {
  const fxRateRepository = new FXRateRepository(pool)
  const fxController = new FXController(fxRateRepository)
  const currentRate = await fxController.getCurrentFX()

  if (!currentRate) {
    console.log('Current FX rate retrieved:', currentRate)
    return { success: false, message: 'No current FX rate available' }
  }

  console.log('Current FX rate retrieved:', currentRate)

  return { success: true, data: currentRate }
})