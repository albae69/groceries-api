import express from 'express'
import {
  getAllProduct,
  getDetailProduct,
  createProduct,
  searchProduct,
} from '../controller/product.controller.js'
import { uploadFile } from '../middleware/multer.js'

const productRouter = express.Router()

productRouter.get('/', getAllProduct)
productRouter.get('/:id', getDetailProduct)
productRouter.get('/search', searchProduct)

productRouter.post('/', uploadFile, createProduct)

export default productRouter
