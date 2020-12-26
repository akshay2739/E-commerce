import { Sequelize } from 'sequelize'

// const sequelize = new Sequelize(
// 	'heroku_fa9cfea5ab68148',
// 	'b618dc7dd8cbe3',
// 	'e3f505a6@',
// 	{
// 		host: 'us-cdbr-east-02.cleardb.com',
// 		dialect: 'mysql',
// 	}
// )

// if (process.env.NODE_ENV === 'development') {
// 	console.log('mysql')
// 	const sequelize = new Sequelize('my-shop', 'root', '123456', {
// 		host: 'localhost',
// 		dialect: 'mysql',
// 	})
// } else {
const sequelize = new Sequelize(
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
				rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
			},
		},
	}
)
// }

// const sequelize = new Sequelize(
// 	'postgres://joijicpioevxex:f4667ba139d3c0b6394400a79e9af10720b9f0d4a5967465243647a0ff5d7b1a@ec2-54-156-53-71.compute-1.amazonaws.com:5432/dfodanoueijrof',
// 	{
// 		dialect: 'postgres',
// 		protocol: 'postgres',
// 		ssl: true,
// 	}
// )

export default sequelize
