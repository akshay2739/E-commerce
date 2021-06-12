import { createRequire } from 'module'
const require = createRequire(import.meta.url)

import sequelize from '../config/db.js'
const { DataTypes } = require('sequelize')

const Products = sequelize.define(
	'products',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		gender: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		size: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		countInStock_S_34: {
			type: DataTypes.INTEGER,
			defaultValue: -1,
		},
		countInStock_M_36: {
			type: DataTypes.INTEGER,
			defaultValue: -1,
		},
		countInStock_L_38: {
			type: DataTypes.INTEGER,
			defaultValue: -1,
		},
		countInStock_XL_40: {
			type: DataTypes.INTEGER,
			defaultValue: -1,
		},
		countInStock_2XL_42: {
			type: DataTypes.INTEGER,
			defaultValue: -1,
		},
		countInStock_3XL_44: {
			type: DataTypes.INTEGER,
			defaultValue: -1,
		},
		countInStock_4XL_46: {
			type: DataTypes.INTEGER,
			defaultValue: -1,
		},
		countInStock_5XL_48: {
			type: DataTypes.INTEGER,
			defaultValue: -1,
		},
		countInStock_6XL_50: {
			type: DataTypes.INTEGER,
			defaultValue: -1,
		},
		countInStock_52: {
			type: DataTypes.INTEGER,
			defaultValue: -1,
		},
		countInStock_54: {
			type: DataTypes.INTEGER,
			defaultValue: -1,
		},
	},
	{
		timestamps: true,
	}
)

export default Products
