import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import path from 'path'
import sequelize from './config/db.js'

import productRoutes from './routes/ProductRoutes.js'

import { errorhandler, notFound } from './middleware/errorMiddleware.js'

import Products from './models/ProductModel.js'
import User from './models/UserModel.js'
import Orders from './models/OrderModel.js'
import OrderItem from './models/OrderItem.js'
import userRoutes from './routes/userRoutes.js'
import orderRoute from './routes/orderRoutes.js'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/api/products', productRoutes)

app.use('/api/users', userRoutes)

app.use('/api/orders', orderRoute)

app.get('/api/config/paypal', (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/front-end/build')))
	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html'))
	)
} else {
	app.get('/', (req, res) => {
		res.send('api is running')
	})
}

app.use(notFound)

app.use(errorhandler)

const PORT = process.env.PORT || 5000

Orders.belongsTo(User)
User.hasMany(Orders)
Orders.belongsToMany(Products, { through: OrderItem })

try {
	await sequelize.authenticate()
	console.log('Connection has been established successfully.')
} catch (error) {
	console.error('Unable to connect to the database:', error)
}

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
