import { Pool } from 'pg'
import { IFXRateRepository } from '../../domain/repositories/IFXRateRepository'
import { FXRate } from '../../domain/entities/FXRate'

export class FXRateRepository implements IFXRateRepository {
  constructor(private readonly db: Pool) {}

  async findAll(): Promise<FXRate[]> {
    const query = `
      SELECT id, rate_standard, rate_tier1, rate_tier2, rate_tier3, valid_from, valid_until, updated_by_id, notes, created_at
      FROM fx_rates
      ORDER BY created_at DESC
    `
    const result = await this.db.query(query)
    return result.rows.map(row => new FXRate(
      row.id,
      parseFloat(row.rate_standard),
      parseFloat(row.rate_tier1),
      parseFloat(row.rate_tier2),
      parseFloat(row.rate_tier3),
      row.updated_by_id,
      row.valid_from ? new Date(row.valid_from) : undefined,
      row.valid_until ? new Date(row.valid_until) : undefined,
      row.notes,
      new Date(row.created_at)
    ))
  }

  async findById(id: string): Promise<FXRate | null> {
    const query = `
      SELECT id, rate_standard, rate_tier1, rate_tier2, rate_tier3, valid_from, valid_until, updated_by_id, notes, created_at
      FROM fx_rates
      WHERE id = $1
    `
    const result = await this.db.query(query, [id])
    if (result.rows.length === 0) return null

    const row = result.rows[0]
    return new FXRate(
      row.id,
      parseFloat(row.rate_standard),
      parseFloat(row.rate_tier1),
      parseFloat(row.rate_tier2),
      parseFloat(row.rate_tier3),
      row.updated_by_id,
      row.valid_from ? new Date(row.valid_from) : undefined,
      row.valid_until ? new Date(row.valid_until) : undefined,
      row.notes,
      new Date(row.created_at)
    )
  }

  async findCurrent(): Promise<FXRate | null> {
    const query = `
      SELECT id, rate_standard, rate_tier1, rate_tier2, rate_tier3, valid_from, valid_until, updated_by_id, notes, created_at
      FROM fx_rates
      ORDER BY created_at DESC
      LIMIT 1
    `
    const result = await this.db.query(query)
    if (result.rows.length === 0) return null

    const row = result.rows[0]
    return new FXRate(
      row.id,
      parseFloat(row.rate_standard),
      parseFloat(row.rate_tier1),
      parseFloat(row.rate_tier2),
      parseFloat(row.rate_tier3),
      row.updated_by_id,
      row.valid_from ? new Date(row.valid_from) : undefined,
      row.valid_until ? new Date(row.valid_until) : undefined,
      row.notes,
      new Date(row.created_at)
    )
  }

  async create(rate: Omit<FXRate, 'id' | 'createdAt'>): Promise<FXRate> {
    const query = `
      INSERT INTO fx_rates (rate_standard, rate_tier1, rate_tier2, rate_tier3, valid_from, valid_until, updated_by_id, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, rate_standard, rate_tier1, rate_tier2, rate_tier3, valid_from, valid_until, updated_by_id, notes, created_at
    `
    const values = [
      rate.rateStandard,
      rate.rateTier1,
      rate.rateTier2,
      rate.rateTier3,
      rate.validFrom,
      rate.validUntil,
      rate.updatedById,
      rate.notes
    ]
    const result = await this.db.query(query, values)
    const row = result.rows[0]
    return new FXRate(
      row.id,
      parseFloat(row.rate_standard),
      parseFloat(row.rate_tier1),
      parseFloat(row.rate_tier2),
      parseFloat(row.rate_tier3),
      row.updated_by_id,
      row.valid_from ? new Date(row.valid_from) : undefined,
      row.valid_until ? new Date(row.valid_until) : undefined,
      row.notes,
      new Date(row.created_at)
    )
  }

  async update(id: string, rate: Partial<Omit<FXRate, 'id' | 'createdAt'>>): Promise<FXRate | null> {
    const fields: string[] = []
    const values: any[] = []
    let paramIndex = 1

    if (rate.rateStandard !== undefined) {
      fields.push(`rate_standard = $${paramIndex}`)
      values.push(rate.rateStandard)
      paramIndex++
    }
    if (rate.rateTier1 !== undefined) {
      fields.push(`rate_tier1 = $${paramIndex}`)
      values.push(rate.rateTier1)
      paramIndex++
    }
    if (rate.rateTier2 !== undefined) {
      fields.push(`rate_tier2 = $${paramIndex}`)
      values.push(rate.rateTier2)
      paramIndex++
    }
    if (rate.rateTier3 !== undefined) {
      fields.push(`rate_tier3 = $${paramIndex}`)
      values.push(rate.rateTier3)
      paramIndex++
    }
    if (rate.validFrom !== undefined) {
      fields.push(`valid_from = $${paramIndex}`)
      values.push(rate.validFrom)
      paramIndex++
    }
    if (rate.validUntil !== undefined) {
      fields.push(`valid_until = $${paramIndex}`)
      values.push(rate.validUntil)
      paramIndex++
    }
    if (rate.notes !== undefined) {
      fields.push(`notes = $${paramIndex}`)
      values.push(rate.notes)
      paramIndex++
    }

    if (fields.length === 0) return await this.findById(id)

    const query = `
      UPDATE fx_rates
      SET ${fields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING id, rate_standard, rate_tier1, rate_tier2, rate_tier3, valid_from, valid_until, updated_by_id, notes, created_at
    `
    values.push(id)

    const result = await this.db.query(query, values)
    if (result.rows.length === 0) return null

    const row = result.rows[0]
    return new FXRate(
      row.id,
      parseFloat(row.rate_standard),
      parseFloat(row.rate_tier1),
      parseFloat(row.rate_tier2),
      parseFloat(row.rate_tier3),
      row.updated_by_id,
      row.valid_from ? new Date(row.valid_from) : undefined,
      row.valid_until ? new Date(row.valid_until) : undefined,
      row.notes,
      new Date(row.created_at)
    )
  }

  async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM fx_rates WHERE id = $1'
    const result = await this.db.query(query, [id])
    return result.rowCount > 0
  }
}