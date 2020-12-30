import asyncHandler from 'express-async-handler'
import protect from '../middleware/authMiddleware.js'
import Products from '../models/ProductModel.js'
import colors from 'colors'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { Op } = require('sequelize')

// Fetch all products
// GET /api/products
// Public

export const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 8

	const page = Number(req.query.pageNumber) || 1

	const options = req.query.keyword
		? {
				where: {
					[Op.or]: [
						{
							name: { [Op.like]: '%' + req.query.keyword + '%' },
						},
					],
				},
		  }
		: {}

	const count = await Products.count(options)
	const products = await Products.findAll({
		...options,
		limit: pageSize,
		offset: pageSize * (page - 1),
	})
	res.json({ products, page, pages: Math.ceil(count / pageSize) })
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

// Fetch products by type
// GET /api/products/products/:type
// Public
export const getProductsByType = asyncHandler(async (req, res) => {
	const pageSize = 8

	const page = Number(req.query.pageNumber) || 1

	const type = req.params.type

	const count = await Products.count({ where: { category: type } })
	const products = await Products.findAll({
		where: { category: type },
		limit: pageSize,
		offset: pageSize * (page - 1),
	})

	if (products) {
		res.json({ products, page, pages: Math.ceil(count / pageSize) })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// Fetch new products
// GET /api/newproducts
// Public
export const getNewProducts = asyncHandler(async (req, res) => {
	const products = await Products.findAll({ limit: 5 })

	if (products) {
		res.json(products)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// Delete a  product
// DELETE /api/products/:id
// Private Admin

export const deleteProductById = asyncHandler(async (req, res) => {
	const id = req.params.id
	const product = await Products.findByPk(id)
	if (product) {
		await product.destroy()
		res.json({ message: 'Product Removed' })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// Create a  product
// POST /api/products/
// Private Admin

export const createProduct = asyncHandler(async (req, res) => {
	const product = {
		name: 'Sample name',
		price: 0,
		image: '/images/men1.jpg',
		category: 'men',
		description: 'description',
		size: 'S',
		countInStock_S: 0,
		countInStock_M: 0,
		countInStock_L: 0,
		countInStock_XL: 0,
		countInStock_XXL: 0,
	}

	const createdProduct = await Products.create(product)
	res.status(201)
	res.send(createdProduct)
})

// Update a  product
// POST /api/products/:id
// Private Admin

export const UpdateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		image,
		category,
		description,
		size,
		countInStock_S,
		countInStock_M,
		countInStock_L,
		countInStock_XL,
		countInStock_XXL,
	} = req.body.product

	const product = await Products.findByPk(req.params.id)

	if (product) {
		product.name = name
		product.price = price
		product.image = image
		product.category = category
		product.description = description
		product.size = size
		product.countInStock_L = countInStock_L
		product.countInStock_M = countInStock_M
		product.countInStock_S = countInStock_S
		product.countInStock_XL = countInStock_XL
		product.countInStock_XXL = countInStock_XXL

		const updatedProduct = await product.save()
		res.json(updatedProduct)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})
