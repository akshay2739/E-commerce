import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()
console.log(process.env.NODE_ENV)

let sequelize

if (process.env.NODE_ENV === 'development') {
	console.log('mysql')
	sequelize = new Sequelize('my-shop', 'root', '123456', {
		host: 'localhost',
		dialect: 'mysql',
	})
} else {
	sequelize = new Sequelize(
		process.env.db,
		process.env.userName,
		process.env.password,
		{
			host: process.env.host,
			port: 5432,
			dialect: 'postgres',
			dialectOptions: {
				ssl: {
					require: true,
					rejectUnauthorized: false,
				},
			},
		}
	)
}

export default sequelize
