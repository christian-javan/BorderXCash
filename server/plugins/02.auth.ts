import pool from '../utils/db'
import { SystemUserRepository } from '../infrastructure/persistence/SystemUserRepository'
import { FXRateRepository } from '../infrastructure/persistence/FXRateRepository'
import { AuthController } from '../interfaces/controllers/AuthController'
import { FXController } from '../interfaces/controllers/FXController'

// Initialize repositories
const systemUserRepository = new SystemUserRepository(pool)
const fxRateRepository = new FXRateRepository(pool)

// Initialize controllers
const authController = new AuthController(systemUserRepository)
const fxController = new FXController(fxRateRepository)

// Make them available globally
declare module 'nitropack' {
  interface NitroApp {
    $authController: AuthController
    $fxController: FXController
  }
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.$authController = authController
  nitroApp.$fxController = fxController
})