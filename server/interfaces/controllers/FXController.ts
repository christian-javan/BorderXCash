import { GetAllFXRatesUseCase, CreateFXRateUseCase, UpdateFXRateUseCase, DeleteFXRateUseCase, GetCurrentFXUseCase } from '../../application/use-cases/fx/FXRateCRUDUseCases'
import type { CreateFXRateRequest, UpdateFXRateRequest } from '../../application/use-cases/fx/FXRateCRUDUseCases'
import type { IFXRateRepository } from '../../domain/repositories/IFXRateRepository'

export class FXController {
  constructor(private readonly fxRateRepository: IFXRateRepository) {}

  async getCurrentFX() {
    const useCase = new GetCurrentFXUseCase(this.fxRateRepository)
    return await useCase.execute()
  }

  async getAllFXRates() {
    const useCase = new GetAllFXRatesUseCase(this.fxRateRepository)
    return await useCase.execute()
  }

  async createFXRate(request: CreateFXRateRequest) {
    const useCase = new CreateFXRateUseCase(this.fxRateRepository)
    return await useCase.execute(request)
  }

  async updateFXRate(request: UpdateFXRateRequest) {
    const useCase = new UpdateFXRateUseCase(this.fxRateRepository)
    return await useCase.execute(request)
  }

  async deleteFXRate(id: string) {
    const useCase = new DeleteFXRateUseCase(this.fxRateRepository)
    return await useCase.execute(id)
  }
}