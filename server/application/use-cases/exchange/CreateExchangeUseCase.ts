import { IRemittanceTransactionRepository } from '../../../domain/repositories/IRemittanceTransactionRepository'
import { RemittanceTransaction } from '../../../domain/entities/RemittanceTransaction'
import { CreateExchangeRequest, CreateExchangeResponse } from '../../../interfaces/dtos/CreateExchangeRequest'

export class CreateExchangeUseCase {
  constructor(private readonly repository: IRemittanceTransactionRepository) {}

  async execute(request: CreateExchangeRequest, fundingEventId: string, spendMxnId: string): Promise<CreateExchangeResponse> {
    const remittanceId = crypto.randomUUID()

    const transaction = new RemittanceTransaction(
      remittanceId,
      request.customerId,
      fundingEventId,
      spendMxnId,
      'PENDING',
      null,
      new Date()
    )

    await this.repository.create(transaction)

    return new CreateExchangeResponse(remittanceId, true)
  }
}