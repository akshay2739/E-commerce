import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import colors from 'colors'
import User from '../models/UserModel.js'
import generateToken from '../utils/generateToken.js'

// User Authentication
// POST /api/user.login
// Public

export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ where: { email: email } })
	console.log(`${user}`.yellow)
	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			token: generateToken(user.id),
		})
	} else {
		res.status(401)
		throw new Error('Invalid email or Password')
	}
})

// Create new user
// POST /api/user/
// public

export const createUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	const userExist = await User.findOne({ where: { email: email } })

	if (userExist) {
		res.status(400)
		throw new Error('User already exists')
	}

	const salt = await bcrypt.genSalt()
	const encryptedPassword = await bcrypt.hash(password, salt)

	const user = await User.create({
		name,
		email,
		password: encryptedPassword,
	})

	if (user) {
		res.status(201).json({
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			token: generateToken(user.id),
		})
	} else {
		res.status(404)
		throw new Error('Invalid user data')
	}
})

// Fetch user profile
// POST /api/user/profile
// Private

export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findByPk(req.user.id)
	if (user) {
		res.json({
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			token: generateToken(user.id),
		})
	} else {
		res.status(404)
		throw new Error('No user found')
	}
})

// Update user profile
// POST /api/user/profile
// Private

export const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findByPk(req.user.id)
	const salt = await bcrypt.genSalt()
	if (user) {
		let encryptedPassword
		if (req.body.password) {
			encryptedPassword = await bcrypt.hash(req.body.password, salt)
		}
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		user.password = encryptedPassword || user.password
		console.log(`${user}`.red)
		let updatedUser = await User.update(
			{ name: user.name, email: user.email, password: user.password },
			{ where: { id: user.id } }
		)

		updatedUser = await User.findByPk(req.user.id)
		res.json({
			id: updatedUser.id,
			name: updatedUser.name,
			email: updatedUser.email,
			role: updatedUser.role,
			token: generateToken(updatedUser.id),
		})
	} else {
		res.status(404)
		throw new Error('No user found')
	}
})

// Fetch all users
// GET /api/user
// Private admin

export const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.findAll()

	if (users) {
		res.json(users)
	} else {
		res.status(404)
		throw new Error('No user found')
	}
})

// Delete  a user
// DELETE /api/users/:id
// Private admin

export const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findByPk(req.params.id)

	if (user) {
		await user.destroy()
		res.json({ message: 'user removed' })
	} else {
		res.status(404)
		throw new Error('No user found')
	}
})

// Get user by id
// FET /api/users/:id
// Private admin

export const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findByPk(req.params.id, {
		attributes: { exclude: ['password'] },
	})

	if (user) {
		res.json(user)
	} else {
		res.status(404)
		throw new Error('No user found')
	}
})

// Update user
// POST /api/user/:id
// Private Admin

export const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findByPk(req.params.id)

	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		user.role = req.body.role || user.role

		const updatedUser = await user.save()
		res.json({
			id: updatedUser.id,
			name: updatedUser.name,
			email: updatedUser.email,
			role: updatedUser.role,
		})
	} else {
		res.status(404)
		throw new Error('No user found')
	}
})
