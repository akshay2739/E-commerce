import { createRequire } from 'module'
const require = createRequire(import.meta.url)

import sequelize from '../config/db.js'
const { DataTypes } = require('sequelize')

const Orders = sequelize.define(
	'orders',
	{
		id: {
			type: DataTypes.UUID,
			// type: DataTypes.STRING,
			defaultValue: DataTypes.UUIDV1,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		orderId: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		address: {
			type: DataTypes.STRING,
		},

		city: { type: DataTypes.STRING },
		postalCode: { type: DataTypes.DOUBLE },
		country: { type: DataTypes.STRING },
		orderType: { type: DataTypes.STRING, allowNull: false },
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
		itemsPrice: {
			type: DataTypes.DOUBLE,
		},
		shippingPrice: {
			type: DataTypes.DOUBLE,
		},
		taxPrice: {
			type: DataTypes.DOUBLE,
		},
		totalPrice: {
			type: DataTypes.DOUBLE,
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
