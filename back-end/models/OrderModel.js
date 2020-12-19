import { createRequire } from 'module'
const require = createRequire(import.meta.url)

import sequelize from '../config/db.js'
const { DataTypes } = require('sequelize')

const Orders = sequelize.define(
	'orders',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		address: {
			type: DataTypes.INTEGER,
			city: DataTypes.INTEGER,
			pin: DataTypes.INTEGER,
		},
		paymentMethod: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		paypalId: {
			type: DataTypes.STRING,
		},
		paymentStatus: {
			type: DataTypes.STRING,
		},
		paypal_email: {
			type: DataTypes.STRING,
		},
		totalPrice: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		isPaid: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		paidAt: {
			type: DataTypes.DATE,
		},
		isDelivered: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		deliveredAt: {
			type: DataTypes.DATE,
		},
	},
	{
		timestamps: true,
	}
)

export default Orders
