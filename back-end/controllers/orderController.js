import asyncHandler from 'express-async-handler'
import Orders from '../models/OrderModel.js'
import Products from '../models/ProductModel.js'
import colors from 'colors'
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
		shippingPrice,
		totalPrice,
	} = req.body

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
