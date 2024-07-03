import express from 'express'

import authRouter from './auth.route.js'
import productRouter from './product.route.js'
import { uploadFile } from '../middleware/multer.js'
import { handleUpload } from '../controller/upload.controller.js'

const routes = express.Router()

routes.use('/auth', authRouter)
routes.use('/products', productRouter)
routes.use('/upload', uploadFile, handleUpload)
// routes.use('/cart')
// routes.use('/favorites')

export default routes
