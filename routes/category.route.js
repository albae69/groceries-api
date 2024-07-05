import express from 'express'

import { uploadFile } from '../middleware/multer.js'
import {
  createProductCategory,
  getCategory,
  getProductByCategory,
} from '../controller/category.controller.js'

const categoryRouter = express.Router()

categoryRouter.get('/', getCategory)

categoryRouter.get('/:id', getProductByCategory)

categoryRouter.post('/create', uploadFile, createProductCategory)

export default categoryRouter
