// lib
import dotenv from 'dotenv/config.js'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// files
import routes from './routes/index.js'

// init
const app = express()

// serve static files
app.use('/public', express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

// routes
const apiVersion = 'v1'
app.get('/', (req, res) => {
  res.json({ message: 'Groceries API' })
})
app.use(`/api/${apiVersion}`, routes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log('server running on PORT: ' + PORT))
