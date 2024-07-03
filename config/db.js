import pg from 'pg'
const { Pool } = pg

const config = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
}

// console.log('database config', config)

const pool = new Pool(config)

export const query = async (text, params, cb) => {
  const start = Date.now()
  const res = pool.query(text, params, cb)
  const duration = Date.now() - start
  console.log('executed query', { text, duration, rows: res.rowCount })
  return res
}
