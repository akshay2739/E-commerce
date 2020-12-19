import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

import products from './data/products.js'
import sequelize from './config/db.js'
import Products from './models/ProductModel.js'
import User from './models/UserModel.js'
import Orders from './models/OrderModel.js'
import OrderItem from './models/OrderItem.js'

// const products = require('./data/products')

dotenv.config()

const app = express()

app.get('/', (req, res) => {
	res.send('api is running')
})

app.get('/api/products', (req, res) => {
	res.json(products)
})

app.get('/api/products/:id', (req, res) => {
	const product = products.find((p) => p._id === req.params.id)
	res.json(product)
})

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
