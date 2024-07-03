import express from 'express'
import {
  getAllProduct,
  getCategory,
  createProductCategory,
  createProduct,
  searchProduct,
  getProductByCategory,
} from '../controller/product.controller.js'
import { uploadFile } from '../middleware/multer.js'

const productRouter = express.Router()

productRouter.get('/', getAllProduct)
productRouter.get('/search', searchProduct)
productRouter.get('/category', getCategory)
productRouter.get('/:category_id', getProductByCategory)

productRouter.post('/', uploadFile, createProduct)
productRouter.post('/category', uploadFile, createProductCategory)

export default productRouter
