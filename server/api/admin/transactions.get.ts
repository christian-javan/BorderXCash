import pool from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const query = `
      SELECT rt.remittance_id, c.email, c.full_name, rt.created_at, rt.status, fe.amount_usd, sm.amount_mxn
      FROM remittance_transactions rt
      JOIN customers c ON rt.customer_id = c.id
      LEFT JOIN funding_events fe ON rt.funding_event_id = fe.id
      LEFT JOIN spend_mxn sm ON rt.spend_mxn_id = sm.id
      WHERE rt.status = 'PENDING'
      ORDER BY rt.created_at DESC
    `
    const result = await pool.query(query)
    return result.rows
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw createError({ statusCode: 500, statusMessage: 'Error fetching transactions' })
  }
})