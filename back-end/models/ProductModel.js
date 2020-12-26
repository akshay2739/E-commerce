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
		countInStock_S: {
			type: DataTypes.INTEGER,
		},
		countInStock_M: {
			type: DataTypes.INTEGER,
		},
		countInStock_L: {
			type: DataTypes.INTEGER,
		},
		countInStock_XL: {
			type: DataTypes.INTEGER,
		},
		countInStock_XXL: {
			type: DataTypes.INTEGER,
		},
	},
	{
		timestamps: true,
	}
)

export default Products
