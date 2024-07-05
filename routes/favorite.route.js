import express from 'express'

import {
  createFavorite,
  getFavoriteList,
} from '../controller/favorite.controller.js'

const favoriteRouter = express.Router()

favoriteRouter.get('/list', getFavoriteList)
favoriteRouter.post('/create', createFavorite)

export default favoriteRouter
