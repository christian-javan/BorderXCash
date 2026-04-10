import pool from '../utils/db'

export default defineNitroPlugin(() => {
  pool.query('SELECT 1')
    .then(() => {
      console.log('Database connected successfully')
    })
    .catch((error) => {
      console.error('Database connection failed:', error)
    })
})