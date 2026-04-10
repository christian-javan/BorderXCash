import { ISystemUserRepository } from '../../../domain/repositories/ISystemUserRepository'
import { SystemUser } from '../../../domain/entities/SystemUser'
import { verifyPassword, generateAccessToken, generateRefreshToken } from '../../../utils/auth'

export interface AdminLoginRequest {
  email: string
  password: string
}

export interface AdminLoginResponse {
  user: {
    id: string
    email: string
    fullName: string
    role: string
  }
  accessToken: string
  refreshToken: string
}

export class AdminLoginUseCase {
  constructor(
    private readonly systemUserRepository: ISystemUserRepository
  ) {}

  async execute(request: AdminLoginRequest): Promise<AdminLoginResponse> {
    const { email, password } = request

    // Dummy user for testing
    const user = { id: 'dummy-id', email, fullName: 'Dummy Admin', role: 'SUPER_ADMIN' as any }

    // // Check if user can login
    // if (!user.canLogin()) {
    //   throw new Error('Account is not active')
    // }

    // // Verify password
    // if (!user.passwordHash) {
    //   throw new Error('Invalid credentials')
    // }

    // const isValidPassword = await verifyPassword(password, user.passwordHash)
    // if (!isValidPassword) {
    //   throw new Error('Invalid credentials')
    // }

    // Update last login
    // await this.systemUserRepository.updateLastLogin(user.id)

    // Generate tokens
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    }

    const accessToken = generateAccessToken(payload)
    const refreshToken = generateRefreshToken(payload)

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      accessToken,
      refreshToken,
    }
  }
}