export enum SystemRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  OPERATIONS = 'OPERATIONS',
  COMPLIANCE = 'COMPLIANCE',
  FINANCE = 'FINANCE',
  VIEWER = 'VIEWER',
}

export enum SystemUserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export class SystemUser {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly fullName: string,
    public readonly role: SystemRole,
    public readonly status: SystemUserStatus,
    public readonly passwordHash?: string,
    public readonly lastLoginAt?: Date,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {}

  isActive(): boolean {
    return this.status === SystemUserStatus.ACTIVE
  }

  canLogin(): boolean {
    return this.isActive() && !!this.passwordHash
  }
}