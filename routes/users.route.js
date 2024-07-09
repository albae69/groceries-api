import express from 'express'

import { getUserById } from '../controller/users.controller.js'

const usersRouter = express.Router()

usersRouter.get('/me', getUserById)

export default usersRouter
