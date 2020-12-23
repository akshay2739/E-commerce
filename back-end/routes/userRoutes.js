import express from 'express'
import {
	authUser,
	createUser,
	getUserProfile,
	updateUserProfile,
} from '../controllers/userController.js'
import protect from '../middleware/authMiddleware.js'

const userRoutes = express.Router()

userRoutes.post('/', createUser)

userRoutes.post('/login', authUser)

userRoutes.get('/profile', protect, getUserProfile)

userRoutes.put('/profile', protect, updateUserProfile)

export default userRoutes
