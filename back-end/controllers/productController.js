import fs from 'fs'
import path from 'path'
import protect from '../middleware/authMiddleware.js'
import asyncHandler from 'express-async-handler'
import Products from '../models/ProductModel.js'
import colors from 'colors'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { Op } = require('sequelize')

const __dirname = path.resolve()

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

	const count = await Products.count({ where: { gender: type } })
	const products = await Products.findAll({
		where: { gender: type },
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
	const products = await Products.findAll({
		limit: 5,
		order: [['createdAt', 'DESC']],
	})

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
		fs.unlink(__dirname + product.image, (err) => console.log(err))
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
		gender: 'men',
		countInStock_S_34: 0,
		countInStock_M_36: 0,
		countInStock_L_38: 0,
		countInStock_XL_40: 0,
		countInStock_2XL_42: 0,
		countInStock_3XL_44: 0,
		countInStock_4XL_46: 0,
		countInStock_5XL_48: 0,
		countInStock_6XL_50: 0,
		countInStock_52: 0,
		countInStock_54: 0,
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
		gender,
		description,
		size,
		countInStock_S_34,
		countInStock_M_36,
		countInStock_L_38,
		countInStock_XL_40,
		countInStock_2XL_42,
		countInStock_3XL_44,
		countInStock_4XL_46,
		countInStock_5XL_48,
		countInStock_6XL_50,
		countInStock_52,
		countInStock_54,
	} = req.body.product

	const product = await Products.findByPk(req.params.id)

	if (product) {
		product.name = name
		product.price = price
		product.image = image
		product.gender = gender
		product.category = category
		product.description = description
		product.size = size
		product.countInStock_L_38 = countInStock_L_38
		product.countInStock_M_36 = countInStock_M_36
		product.countInStock_S_34 = countInStock_S_34
		product.countInStock_XL_40 = countInStock_XL_40
		product.countInStock_2XL_42 = countInStock_2XL_42
		product.countInStock_3XL_44 = countInStock_3XL_44
		product.countInStock_4XL_46 = countInStock_4XL_46
		product.countInStock_5XL_48 = countInStock_5XL_48
		product.countInStock_6XL_50 = countInStock_6XL_50
		product.countInStock_52 = countInStock_52
		product.countInStock_54 = countInStock_54

		const updatedProduct = await product.save()
		res.json(updatedProduct)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})
