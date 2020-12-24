import express from 'express'

import { addOrderItems } from '../controllers/orderController.js'

import protect from '../middleware/authMiddleware.js'

const orderRoute = express.Router()

orderRoute.post('/', protect, addOrderItems)

export default orderRoute
