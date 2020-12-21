import express from 'express'
import {
	authUser,
	createUser,
	getUserProfile,
} from '../controllers/userController.js'
import protect from '../middleware/authMiddleware.js'

const userRoutes = express.Router()

userRoutes.post('/', createUser)

userRoutes.post('/login', authUser)

userRoutes.get('/profile', protect, getUserProfile)

export default userRoutes
