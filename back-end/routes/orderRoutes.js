import express from 'express'

import { addOrderItems, getOrderById } from '../controllers/orderController.js'

import protect from '../middleware/authMiddleware.js'

const orderRoute = express.Router()

orderRoute.post('/', protect, addOrderItems)

orderRoute.get('/:id', protect, getOrderById)

export default orderRoute
