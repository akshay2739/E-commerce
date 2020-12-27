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
		'dfodanoueijrof',
		'joijicpioevxex',
		'f4667ba139d3c0b6394400a79e9af10720b9f0d4a5967465243647a0ff5d7b1a',
		{
			host: 'ec2-54-156-53-71.compute-1.amazonaws.com',
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
