import express from 'express'

import {
	addOrderItems,
	getAllOrders,
	getMyOrders,
	getOrderById,
	updateOrderToDelivered,
	updateOrderToPaid,
} from '../controllers/orderController.js'

import protect, { isAdmin } from '../middleware/authMiddleware.js'

const orderRoute = express.Router()

orderRoute.post('/', protect, addOrderItems)

orderRoute.get('/myorders', protect, getMyOrders)

orderRoute.get('/:id', protect, getOrderById)

orderRoute.put('/:id/pay', protect, updateOrderToPaid)

orderRoute.get('/', protect, isAdmin, getAllOrders)

orderRoute.put('/:id/deliver', protect, isAdmin, updateOrderToDelivered)
export default orderRoute
