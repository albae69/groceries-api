import express from 'express'

import { getCartList, createCart } from '../controller/cart.controller.js'

const cartRouter = express.Router()

cartRouter.get('/list', getCartList)
cartRouter.post('/create', createCart)

export default cartRouter
