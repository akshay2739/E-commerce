import express from 'express'
import {
	authUser,
	createUser,
	deleteUser,
	getAllUsers,
	getUserById,
	getUserProfile,
	updateUser,
	updateUserProfile,
} from '../controllers/userController.js'
import protect, { isAdmin } from '../middleware/authMiddleware.js'

const userRoutes = express.Router()

userRoutes.post('/', createUser)

userRoutes.post('/login', authUser)

userRoutes.get('/profile', protect, getUserProfile)

userRoutes.put('/profile', protect, updateUserProfile)

userRoutes.get('/', protect, isAdmin, getAllUsers)

userRoutes.delete('/:id', protect, isAdmin, deleteUser)

userRoutes.get('/:id', protect, isAdmin, getUserById)

userRoutes.put('/:id', protect, isAdmin, updateUser)

export default userRoutes
