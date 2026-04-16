import { Pool } from 'pg'
import { ISystemUserRepository } from '../../domain/repositories/ISystemUserRepository'
import { SystemUser, SystemRole, SystemUserStatus } from '../../domain/entities/SystemUser'

export class SystemUserRepository implements ISystemUserRepository {
  constructor(private readonly db: Pool) {}

  async findByEmail(email: string): Promise<SystemUser | null> {
    const query = `
      SELECT id, email, full_name, role, status, password_hash, last_login_at, created_at, updated_at
      FROM system_users
      WHERE email = $1
    `
    const result = await this.db.query(query, [email])

    if (result.rows.length === 0) {
      return null
    }

    const row = result.rows[0]
    return new SystemUser(
      row.id,
      row.email,
      row.full_name,
      row.role as SystemRole,
      row.status as SystemUserStatus,
      row.password_hash,
      row.last_login_at ? new Date(row.last_login_at) : undefined,
      new Date(row.created_at),
      new Date(row.updated_at)
    )
  }

  async findById(id: string): Promise<SystemUser | null> {
    const query = `
      SELECT id, email, full_name, role, status, password_hash, last_login_at, created_at, updated_at
      FROM system_users
      WHERE id = $1
    `
    const result = await this.db.query(query, [id])

    if (result.rows.length === 0) {
      return null
    }

    const row = result.rows[0]
    return new SystemUser(
      row.id,
      row.email,
      row.full_name,
      row.role as SystemRole,
      row.status as SystemUserStatus,
      row.password_hash,
      row.last_login_at ? new Date(row.last_login_at) : undefined,
      new Date(row.created_at),
      new Date(row.updated_at)
    )
  }

  async updateLastLogin(id: string): Promise<void> {
    const query = `
      UPDATE system_users
      SET last_login_at = NOW()
      WHERE id = $1
    `
    await this.db.query(query, [id])
  }
}