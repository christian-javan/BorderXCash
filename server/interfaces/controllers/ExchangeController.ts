import { CreateExchangeUseCase } from '../../application/use-cases/exchange/CreateExchangeUseCase'
import { CreateExchangeRequest, CreateExchangeResponse } from '../dtos/CreateExchangeRequest'

export class ExchangeController {
  constructor(private readonly createExchangeUseCase: CreateExchangeUseCase) {}

  async createExchange(request: CreateExchangeRequest, fundingEventId: string, spendMxnId: string): Promise<CreateExchangeResponse> {
    return await this.createExchangeUseCase.execute(request, fundingEventId, spendMxnId)
  }
}