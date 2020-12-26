import asyncHandler from 'express-async-handler'
import Products from '../models/ProductModel.js'

// Fetch all products
// GET /api/products
// Public

export const getProducts = asyncHandler(async (req, res) => {
	const products = await Products.findAll()
	res.json(products)
})

// Fetch single product
// GET /api/products/:id
// Public

export const getProductById = asyncHandler(async (req, res) => {
	const id = req.params.id
	const product = await Products.findByPk(id)
	if (product) {
		res.json(product)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

export const getProductsByType = asyncHandler(async (req, res) => {
	const type = req.params.type
	const products = await Products.findAll({ where: { category: type } })
	if (products) {
		res.json(products)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})
