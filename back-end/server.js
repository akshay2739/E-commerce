import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

import sequelize from './config/db.js'

import productRoutes from './routes/ProductRoutes.js'

import { errorhandler, notFound } from './middleware/errorMiddleware.js'

import Products from './models/ProductModel.js'
import User from './models/UserModel.js'
import Orders from './models/OrderModel.js'
import OrderItem from './models/OrderItem.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('api is running')
})

app.use('/api/products', productRoutes)

app.use('/api/users', userRoutes)

app.use(notFound)

app.use(errorhandler)

const PORT = process.env.PORT || 5000

Orders.belongsTo(User)
User.hasMany(Orders)
Orders.belongsToMany(Products, { through: OrderItem })

sequelize
	// .sync({ force: true })
	.sync()
	.then((result) => {
		console.log('Database is connected')
		app.listen(
			PORT,
			console.log(
				`server is running in ${process.env.NODE_ENV} on ${PORT}`.yellow
					.underline
			)
		)
	})
	.catch((err) => {
		console.log(`Error : ${err}`.red.bold)
		process.exit(1)
	})
