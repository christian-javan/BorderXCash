import { RemittanceTransaction } from '../entities/RemittanceTransaction'

export interface IRemittanceTransactionRepository {
  create(transaction: RemittanceTransaction): Promise<void>
  findById(remittanceId: string): Promise<RemittanceTransaction | null>
}