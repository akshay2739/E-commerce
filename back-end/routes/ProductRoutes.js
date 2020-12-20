import express from 'express'
import asyncHandler from 'express-async-handler'
import colors from 'colors'

import Products from '../models/ProductModel.js'

const router = express.Router()

// Fetch all products
// GET /api/products
// Public
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const products = await Products.findAll()
		res.json(products)
	})
)

// Fetch single product
// GET /api/products/:id
// Public
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const id = req.params.id
		const product = await Products.findByPk(id)
		if (product) {
			res.json(product)
		} else {
			res.status(404)
			throw new Error('Product not found')
		}
	})
)

export default router
