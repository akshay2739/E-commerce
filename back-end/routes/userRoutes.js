import express from 'express'
import {
	authUser,
	createUser,
	getAllUsers,
	getUserProfile,
	updateUserProfile,
} from '../controllers/userController.js'
import protect, { isAdmin } from '../middleware/authMiddleware.js'

const userRoutes = express.Router()

userRoutes.post('/', createUser)

userRoutes.post('/login', authUser)

userRoutes.get('/profile', protect, getUserProfile)

userRoutes.put('/profile', protect, updateUserProfile)

userRoutes.get('/', protect, isAdmin, getAllUsers)

export default userRoutes
