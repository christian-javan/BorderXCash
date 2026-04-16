import pool from '../utils/db'
import { SystemUserRepository } from '../infrastructure/persistence/SystemUserRepository'
import { AuthController } from '../interfaces/controllers/AuthController'

// Initialize repositories
const systemUserRepository = new SystemUserRepository(pool)

// Initialize controllers
const authController = new AuthController(systemUserRepository)

// Make them available globally
declare module 'nitropack' {
  interface NitroApp {
    $authController: AuthController
  }
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.$authController = authController
})