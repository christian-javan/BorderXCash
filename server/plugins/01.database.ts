import pool from '../utils/db'

export default defineNitroPlugin(async () => {
  try {
    await pool.query('SELECT 1')
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Database connection failed:', error)
  }
})