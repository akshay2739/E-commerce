import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'

import User from '../models/UserModel.js'
import generateToken from '../utils/generateToken.js'

// User Authentication
// POST /api/user.login
// Public

export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ where: { email: email } })
	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			id: user.id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
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
			isAdmin: user.isAdmin,
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
			email: user.name,
			isAdmin: user.isAdmin,
			token: generateToken(user.id),
		})
	} else {
		res.status(404)
		throw new Error('No user found')
	}
})
