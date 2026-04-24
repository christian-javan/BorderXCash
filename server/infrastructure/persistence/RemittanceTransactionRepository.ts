import pool from '../../utils/db'
import { IRemittanceTransactionRepository } from '../../domain/repositories/IRemittanceTransactionRepository'
import { RemittanceTransaction } from '../../domain/entities/RemittanceTransaction'

export class RemittanceTransactionRepository implements IRemittanceTransactionRepository {
  async create(transaction: RemittanceTransaction): Promise<void> {
    const query = `
      INSERT INTO remittance_transactions (remittance_id, customer_id, funding_event_id, spend_mxn_id, status)
      VALUES ($1, $2, $3, $4, $5)
    `
    const values = [
      transaction.remittanceId,
      transaction.customerId,
      transaction.fundingEventId,
      transaction.spendMxnId,
      transaction.status
    ]
    await pool.query(query, values)
  }

  async findById(remittanceId: string): Promise<RemittanceTransaction | null> {
    const query = 'SELECT * FROM remittance_transactions WHERE remittance_id = $1'
    const result = await pool.query(query, [remittanceId])
    if (result.rows.length === 0) return null
    const row = result.rows[0]
    return new RemittanceTransaction(
      row.remittance_id,
      row.customer_id,
      row.funding_event_id,
      row.spend_mxn_id,
      row.status,
      row.settled_at,
      row.created_at
    )
  }
}