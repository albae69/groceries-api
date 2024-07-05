import express from 'express'

import { uploadFile } from '../middleware/multer.js'
import { handleUpload } from '../controller/upload.controller.js'
import { verifyToken } from '../middleware/auth.js'

import authRouter from './auth.route.js'
import productRouter from './product.route.js'
import cartRouter from './cart.route.js'
import favoriteRouter from './favorite.route.js'
import categoryRouter from './category.route.js'

const routes = express.Router()

routes.use('/auth', authRouter)
routes.use('/products', productRouter)
routes.use('/category', categoryRouter)
routes.use('/upload', uploadFile, handleUpload)
routes.use('/cart', verifyToken, cartRouter)
routes.use('/favorite', verifyToken, favoriteRouter)

export default routes
