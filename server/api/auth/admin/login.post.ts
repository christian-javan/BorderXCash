import pool from '../../../utils/db'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  try {
    const result = await pool.query('SELECT * FROM system_users WHERE email = $1', [email])
    if (result.rows.length === 0) {
      return { success: false, message: 'User not found' }
    }
    const user = result.rows[0]
    // Verify password hash
    const isValid = await bcrypt.compare(password, user.password_hash)
    if (!isValid) {
      return { success: false, message: 'Invalid password' }
    }
    return { success: true, message: 'Login successful', user: { id: user.id, email: user.email } }
  } catch (error) {
    return { success: false, message: 'Database error' }
  }
})