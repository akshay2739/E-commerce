import sequelize from './config/db.js'

import products from './data/products.js'
import users from './data/users.js'

import Orders from './models/OrderModel.js'
import Products from './models/ProductModel.js'
import User from './models/UserModel.js'

const impportData = async () => {
	try {
		await User.destroy({ truncate: { cascade: true } })
		await Products.destroy({ truncate: { cascade: true } })
		await Orders.destroy({ truncate: { cascade: true } })

		await User.bulkCreate(users)
		await Products.bulkCreate(products)

		console.log('Data added!!!')
		process.exit()
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

const deleteData = async () => {
	try {
		await Orders.destroy({ truncate: { cascade: true } })
		await User.destroy({ truncate: { cascade: true } })
		await Products.destroy({ truncate: { cascade: true } })

		console.log('Data deleted!!!')
		process.exit()
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

if (process.argv[2] == '-d') {
	deleteData()
} else {
	impportData()
}
