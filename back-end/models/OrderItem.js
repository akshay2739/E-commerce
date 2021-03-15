import { createRequire } from 'module'
const require = createRequire(import.meta.url)

import sequelize from '../config/db.js'
const { DataTypes } = require('sequelize')

const OrderItem = sequelize.define('orderItem', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV1,
		primaryKey: true,
		allowNull: false,
		unique: true,
	},
	quantity: {
		type: DataTypes.INTEGER,
	},
	size: {
		type: DataTypes.STRING,
	},
})

export default OrderItem
