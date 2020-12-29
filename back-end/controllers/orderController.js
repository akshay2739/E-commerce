import asyncHandler from 'express-async-handler'
import Orders from '../models/OrderModel.js'
import Products from '../models/ProductModel.js'
import colors from 'colors'
import User from '../models/UserModel.js'
import OrderItem from '../models/OrderItem.js'

// Create Order
// POST /api/orders
// Private

export const addOrderItems = asyncHandler(async (req, res) => {
	const {
		cartItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		orderType,
		shippingPrice,
		totalPrice,
	} = req.body
	console.log(req.body.orderType)
	if (cartItems && cartItems.length === 0) {
		res.status(400)
		throw new Error('No Order Items')
	} else {
		const newOrder = await req.user.createOrder({
			address: shippingAddress.address,
			city: shippingAddress.city,
			postalCode: shippingAddress.postalCode,
			country: shippingAddress.country,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
			orderType,
		})

		cartItems.map(async (item) => {
			const productItem = await Products.findByPk(item.id)
			const addedProducts = await newOrder.addProducts(productItem, {
				through: { quantity: item.quantity },
			})
		})

		res.send(newOrder)
	}
})

// Fetch Order by id
// GET /api/orders/:id
// Private

export const getOrderById = asyncHandler(async (req, res) => {
	const order = await Orders.findByPk(req.params.id, {
		include: [{ model: User }, { model: Products }],
	})

	if (
		order &&
		(req.user.role === 'my-shop-admin' || order.user.id === req.user.id)
	) {
		res.json(order)
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
})

// Update Order to paid
// GET /api/orders/:id/pay
// Private

export const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Orders.findByPk(req.params.id, {
		include: [{ model: User }],
	})
	if (
		order &&
		(req.user.role === 'my-shop-admin' || order.user.id === req.user.id)
	) {
		order.isPaid = true
		order.paidAt = Date.now()
		order.paypalId = req.body.id
		order.paymentStatus = req.body.status
		order.paypal_email = req.body.payer.email_address

		const updatedOrder = await order.save()
		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
})

// Update Order to Delivered
// GET /api/orders/:id/deliver
// Private Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Orders.findByPk(req.params.id)

	if (order && req.user.role === 'my-shop-admin') {
		order.isDelivered = true
		order.deliveredAt = Date.now()

		const updatedOrder = await order.save()
		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
})

// Get logged in users orders
// GET /api/orders/myorders
// Private

export const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await req.user.getOrders()
	res.json(orders)
})

// Get All orders
// GET /api/orders/
// Private Admin

export const getAllOrders = asyncHandler(async (req, res) => {
	const orders = await Orders.findAll({
		include: [{ model: User }, { model: Products }],
	})
	res.json(orders)
})
