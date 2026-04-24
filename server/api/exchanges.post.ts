
import pool from '../utils/db'
import { RemittanceTransactionRepository } from '../infrastructure/persistence/RemittanceTransactionRepository'
import { CreateExchangeUseCase } from '../application/use-cases/exchange/CreateExchangeUseCase'
import { ExchangeController } from '../interfaces/controllers/ExchangeController'
import { CreateExchangeRequest } from '../interfaces/dtos/CreateExchangeRequest'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const customerId = body.customerId || '550e8400-e29b-41d4-a716-446655440000'
  const dummyAgentId = '660e8400-e29b-41d4-a716-446655440001'
  const dummyCashierId = '770e8400-e29b-41d4-a716-446655440002'

  // Ensure dummy agent exists
  await pool.query(`
    INSERT INTO agents (agent_id, name, address_mx, country, jurisdiction, daily_limit_usd, per_txn_limit_usd, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (agent_id) DO NOTHING
  `, [dummyAgentId, 'Dummy Agent', 'Dummy Address', 'Mexico', 'Baja California', 10000.00, 1000.00, 'ACTIVE'])

  // Ensure dummy cashier exists
  await pool.query(`
    INSERT INTO cashier_users (id, agent_id, username, email, password_hash, full_name, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (id) DO NOTHING
  `, [dummyCashierId, dummyAgentId, 'dummy_cashier', 'cashier@dummy.com', 'dummyhash', 'Dummy Cashier', 'ACTIVE'])

  // Create dummy funding_event
  const fundingEventId = crypto.randomUUID()
  const folio = 'FX-' + Date.now()
  await pool.query(`
    INSERT INTO funding_events (id, folio, customer_id, amount_usd, fx_rate_locked, mxn_equivalent, status, agent_id, cashier_user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  `, [fundingEventId, folio, customerId, body.amountUsd, body.rate, body.amountMxn, 'PENDING', dummyAgentId, dummyCashierId])

  // Create dummy spend_mxn
  const spendMxnId = crypto.randomUUID()
  const spendFolio = 'SP-' + Date.now()
  await pool.query(`
    INSERT INTO spend_mxn (id, customer_id, amount_mxn, channel, status, folio)
    VALUES ($1, $2, $3, $4, $5, $6)
  `, [spendMxnId, customerId, body.amountMxn, 'CASH_VENTANILLA', 'PENDING', spendFolio])

  const request = new CreateExchangeRequest(
    customerId,
    body.amountUsd,
    body.amountMxn,
    body.rate
  )

  const repository = new RemittanceTransactionRepository()
  const useCase = new CreateExchangeUseCase(repository)
  const controller = new ExchangeController(useCase)

  const response = await controller.createExchange(request, fundingEventId, spendMxnId)

  return {
    success: response.success,
    remittanceId: response.remittanceId,
    message: 'Transacción creada exitosamente'
  }
})