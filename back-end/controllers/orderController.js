import asyncHandler from 'express-async-handler'
import Orders from '../models/OrderModel.js'
import Products from '../models/ProductModel.js'
import colors from 'colors'
import User from '../models/UserModel.js'
import OrderItem from '../models/OrderItem.js'
import orderRoute from '../routes/orderRoutes.js'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

let transport = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.email,
		pass: process.env.emailPassword,
	},
})

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

	if (cartItems && cartItems.length === 0) {
		res.status(400)
		throw new Error('No Order Items')
	} else {
		let numberOfOrders = await Orders.count()
		numberOfOrders++

		let numberOfOrdersString = String(numberOfOrders)

		if (numberOfOrdersString.length === 5) {
			numberOfOrdersString = '0' + numberOfOrdersString
		} else if (numberOfOrdersString.length === 4) {
			numberOfOrdersString = '00' + numberOfOrdersString
		} else if (numberOfOrdersString.length === 3) {
			numberOfOrdersString = '000' + numberOfOrdersString
		} else if (numberOfOrdersString.length === 2) {
			numberOfOrdersString = '0000' + numberOfOrdersString
		} else if (numberOfOrdersString.length === 1) {
			numberOfOrdersString = '00000' + numberOfOrdersString
		}

		const date = new Date()
		const months = [
			'JAN',
			'FEB',
			'MAR',
			'APR',
			'JUN',
			'JUL',
			'AUG',
			'SEP',
			'OCT',
			'NOV',
			'DEC',
		]
		const month = months[date.getMonth()]
		const orderID = 'MS' + month + numberOfOrdersString

		const newOrder = await req.user.createOrder({
			orderId: orderID,
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
				through: { quantity: item.quantity, size: item.size },
			})
		})

		const message = {
			from: 'crapbag0086@gmail.com', // Sender address
			to: req.user.email, // List of recipients
			subject: `Your MyShop Order #${orderID}`, // Subject line
			// text: 'Thank you so much!', // Plain text body
			html: `
			<h4>Hello ${req.user.name}</h4>
			<p>Thank you so much for choosing us.</p>
			<p>We have received your order.</p>
			<p>Order ID <strong>#${orderID}</strong></p>
			<p>Thank you!</p>
			`,
		}

		transport.sendMail(message, function (err, info) {
			if (err) {
				console.log(err)
			} else {
				console.log(info)
			}
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

		const orderItems = await OrderItem.findAll({
			where: { orderId: req.params.id },
		})

		orderItems.map(async (orderItem) => {
			console.log('ORDER'.green)
			const productId = orderItem.productId
			const product = await Products.findByPk(productId)
			switch (orderItem.size) {
				case 'S':
					product.countInStock_S -= orderItem.quantity
					break

				case 'M':
					product.countInStock_M -= orderItem.quantity
					break

				case 'L':
					product.countInStock_L -= orderItem.quantity
					break

				case 'XL':
					product.countInStock_XL -= orderItem.quantity
					break

				case 'XXL':
					product.countInStock_XXL -= orderItem.quantity
					break

				default:
					break
			}

			const updatedProduct = await product.save()
		})

		const message = {
			from: 'crapbag0086@gmail.com', // Sender address
			to: req.user.email, // List of recipients
			subject: `MyShop : Received payment for Order #${order.orderId}`, // Subject line
			// text: 'Thank you so much!', // Plain text body
			html: `
			<h4>Hello ${req.user.name}</h4>
			<p>Thank you so much for choosing us.</p>
			<p>We have received your payment for Order ID <strong>#${order.orderId}</strong></p>
			<p>Thank you!</p>`,
		}
		transport.sendMail(message, function (err, info) {
			if (err) {
				console.log(err)
			} else {
				console.log(info)
			}
		})
		console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
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

	const orderUser = await User.findByPk(order.userId)
	const orderUserEmail = orderUser.email
	if (order && req.user.role === 'my-shop-admin') {
		order.isDelivered = true
		order.deliveredAt = Date.now()

		const updatedOrder = await order.save()

		const message = {
			from: 'crapbag0086@gmail.com', // Sender address
			to: orderUserEmail, // List of recipients
			subject: `MyShop : Delivered Order #${order.orderId}`, // Subject line
			// text: 'Thank you so much!', // Plain text body
			html: `
				<h4>Hello ${orderUser.name}</h4>
				<p>Thank you so much for choosing us.</p>
				<p>Order ID <strong>#${order.orderId}</strong></p>
				<p>Your order is delivered.</p>
				<p>Thank you!</p>
				`,
		}
		transport.sendMail(message, function (err, info) {
			if (err) {
				console.log(err)
			} else {
				console.log(info)
			}
		})

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
		order: [
			['createdAt', 'DESC'],
			['deliveredAt', 'DESC'],
			['paidAt', 'DESC'],
		],
	})
	res.json(orders)
})
