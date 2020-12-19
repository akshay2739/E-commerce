import { createRequire } from 'module'
const require = createRequire(import.meta.url)

import sequelize from '../config/db.js'
const { DataTypes } = require('sequelize')

const OrderItem = sequelize.define('orderItem', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	quantity: {
		type: DataTypes.INTEGER,
	},
})

export default OrderItem
