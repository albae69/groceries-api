import express from 'express'
import {
  getAllProduct,
  getAllProductCategory,
  createProductCategory,
  createProduct,
} from '../controller/product.controller.js'
import { uploadFile } from '../middleware/multer.js'

const productRouter = express.Router()

productRouter.get('/', getAllProduct)
productRouter.get('/category', getAllProductCategory)

productRouter.post('/', uploadFile, createProduct)
productRouter.post('/category', uploadFile, createProductCategory)

export default productRouter
