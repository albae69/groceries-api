import dotenv from 'dotenv/config.js'
import { query } from './db.js'

query(
  'INSERT INTO product(id,name,description,imageUrl,price) values($1,$2,$3,$4,$5)',
  ['tes', 'name', 'description', 'https://', 5.5]
)
