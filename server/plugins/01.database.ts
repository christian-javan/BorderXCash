import pool from '../utils/db'

export default defineNitroPlugin(async () => {
  try {
    await pool.query('SELECT 1')
    console.log('Database connected successfully')

    // Insert dummy data
    const dummyCustomerId = '550e8400-e29b-41d4-a716-446655440000'
    await pool.query(`
      INSERT INTO customers (id, customer_id, email, phone_mx, address_mx, id_type, full_name, kyc_status, ofac_status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (id) DO NOTHING
    `, [dummyCustomerId, 'DUMMY001', 'dummy@borderxcash.com', '+52551234567', 'Calle Ficticia 123, Tijuana, MX', 'INE', 'Cliente Dummy', 'VERIFIED', 'CLEARED'])

    const dummyAgentId = '660e8400-e29b-41d4-a716-446655440001'
    await pool.query(`
      INSERT INTO agents (agent_id, name, address_mx, country, jurisdiction, daily_limit_usd, per_txn_limit_usd, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (agent_id) DO NOTHING
    `, [dummyAgentId, 'Dummy Agent', 'Dummy Address', 'Mexico', 'Baja California', 10000.00, 1000.00, 'ACTIVE'])

    const dummyCashierId = '770e8400-e29b-41d4-a716-446655440002'
    await pool.query(`
      INSERT INTO cashier_users (id, agent_id, username, email, password_hash, full_name, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (id) DO NOTHING
    `, [dummyCashierId, dummyAgentId, 'dummy_cashier', 'cashier@dummy.com', 'dummyhash', 'Dummy Cashier', 'ACTIVE'])

    console.log('Dummy data ensured')
  } catch (error) {
    console.error('Database setup failed:', error)
  }
})