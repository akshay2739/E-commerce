import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'

const protect = expressAsyncHandler(async (req, res, next) => {
	let token

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1]

			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			req.user = await User.findByPk(decoded.id, {
				attributes: { exclude: ['password'] },
			})
		} catch (error) {
			console.log(error)
			res.status(401)
			throw new Error('Not authorised')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not authorised')
	}

	next()
})

export default protect
