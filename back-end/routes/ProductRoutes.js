import express from 'express'

import colors from 'colors'
import {
	getProductById,
	getProducts,
	getProductsByType,
} from '../controllers/productController.js'

const router = express.Router()

router.get('/', getProducts)

router.get('/products/:type', getProductsByType)

router.get('/:id', getProductById)

export default router
