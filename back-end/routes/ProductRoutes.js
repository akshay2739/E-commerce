import express from 'express'

import colors from 'colors'
import {
	createProduct,
	deleteProductById,
	getNewProducts,
	getProductById,
	getProducts,
	getProductsByType,
	UpdateProduct,
} from '../controllers/productController.js'

import protect, { isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getProducts)

router.post('/', protect, isAdmin, createProduct)

router.get('/products/:type', getProductsByType)

router.get('/newproducts', getNewProducts)

router.get('/:id', getProductById)

router.delete('/:id', protect, isAdmin, deleteProductById)

router.put('/:id', protect, isAdmin, UpdateProduct)

export default router
