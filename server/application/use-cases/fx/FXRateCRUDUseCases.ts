import type { IFXRateRepository } from '../../../domain/repositories/IFXRateRepository'

export class GetCurrentFXUseCase {
  constructor(private readonly fxRateRepository: IFXRateRepository) {}

  async execute(): Promise<{ rateStandard: number; rateTier1: number; rateTier2: number; rateTier3: number } | null> {
    const currentRate = await this.fxRateRepository.findCurrent()
    if (!currentRate) return null

    return {
      rateStandard: currentRate.rateStandard,
      rateTier1: currentRate.rateTier1,
      rateTier2: currentRate.rateTier2,
      rateTier3: currentRate.rateTier3,
    }
  }
}

export class GetAllFXRatesUseCase {
  constructor(private readonly fxRateRepository: IFXRateRepository) {}

  async execute(): Promise<any[]> {
    const rates = await this.fxRateRepository.findAll()
    return rates.map(rate => ({
      id: rate.id,
      rateStandard: rate.rateStandard,
      rateTier1: rate.rateTier1,
      rateTier2: rate.rateTier2,
      rateTier3: rate.rateTier3,
      validFrom: rate.validFrom?.toISOString().slice(0, 16),
      validUntil: rate.validUntil?.toISOString().slice(0, 16),
      notes: rate.notes,
      createdAt: rate.createdAt.toISOString(),
    }))
  }
}

export interface CreateFXRateRequest {
  rateStandard: number
  rateTier1: number
  rateTier2: number
  rateTier3: number
  updatedById: string
  validFrom?: string
  validUntil?: string
  notes?: string
}

export class CreateFXRateUseCase {
  constructor(private readonly fxRateRepository: IFXRateRepository) {}

  async execute(request: CreateFXRateRequest) {
    const fxRate = new (await import('../../../domain/entities/FXRate')).FXRate(
      '', // id will be generated
      request.rateStandard,
      request.rateTier1,
      request.rateTier2,
      request.rateTier3,
      request.updatedById,
      request.validFrom ? new Date(request.validFrom) : undefined,
      request.validUntil ? new Date(request.validUntil) : undefined,
      request.notes
    )

    return await this.fxRateRepository.create(fxRate)
  }
}

export interface UpdateFXRateRequest {
  id: string
  rateStandard?: number
  rateTier1?: number
  rateTier2?: number
  rateTier3?: number
  validFrom?: string
  validUntil?: string
  notes?: string
}

export class UpdateFXRateUseCase {
  constructor(private readonly fxRateRepository: IFXRateRepository) {}

  async execute(request: UpdateFXRateRequest) {
    const updateData: any = {}
    if (request.rateStandard !== undefined) updateData.rateStandard = request.rateStandard
    if (request.rateTier1 !== undefined) updateData.rateTier1 = request.rateTier1
    if (request.rateTier2 !== undefined) updateData.rateTier2 = request.rateTier2
    if (request.rateTier3 !== undefined) updateData.rateTier3 = request.rateTier3
    if (request.validFrom !== undefined) updateData.validFrom = request.validFrom ? new Date(request.validFrom) : undefined
    if (request.validUntil !== undefined) updateData.validUntil = request.validUntil ? new Date(request.validUntil) : undefined
    if (request.notes !== undefined) updateData.notes = request.notes

    return await this.fxRateRepository.update(request.id, updateData)
  }
}

export class DeleteFXRateUseCase {
  constructor(private readonly fxRateRepository: IFXRateRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.fxRateRepository.delete(id)
  }
}