import { SystemUser } from '../entities/SystemUser'

export interface ISystemUserRepository {
  findByEmail(email: string): Promise<SystemUser | null>
  findById(id: string): Promise<SystemUser | null>
  updateLastLogin(id: string): Promise<void>
}