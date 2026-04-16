export class FXRate {
  constructor(
    public readonly id: string,
    public readonly rateStandard: number,
    public readonly rateTier1: number,
    public readonly rateTier2: number,
    public readonly rateTier3: number,
    public readonly updatedById: string,
    public readonly validFrom?: Date,
    public readonly validUntil?: Date,
    public readonly notes?: string,
    public readonly createdAt: Date = new Date()
  ) {}

  isActive(now: Date = new Date()): boolean {
    if (this.validFrom && now < this.validFrom) return false
    if (this.validUntil && now > this.validUntil) return false
    return true
  }
}