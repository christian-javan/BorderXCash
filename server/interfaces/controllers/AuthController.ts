import { AdminLoginUseCase, AdminLoginRequest } from '../../application/use-cases/auth/AdminLoginUseCase'
import { ISystemUserRepository } from '../../domain/repositories/ISystemUserRepository'

export class AuthController {
  constructor(
    public readonly systemUserRepository: ISystemUserRepository
  ) {}

  async adminLogin(request: AdminLoginRequest) {
    const useCase = new AdminLoginUseCase(this.systemUserRepository)
    return await useCase.execute(request)
  }
}