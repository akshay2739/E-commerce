import express from 'express'

import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
} from '../controllers/orderController.js'

import protect from '../middleware/authMiddleware.js'

const orderRoute = express.Router()

orderRoute.post('/', protect, addOrderItems)

orderRoute.get('/:id', protect, getOrderById)

orderRoute.put('/:id/pay', protect, updateOrderToPaid)

export default orderRoute
