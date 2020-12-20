import bcrypt from 'bcryptjs'

const users = [
	{
		name: 'Akshay',
		password: bcrypt.hashSync('123456'),
		email: 'a@b.com',
		isAdmin: true,
	},
	{
		name: 'Akruti',
		password: bcrypt.hashSync('123456'),
		email: 'b@b.com',
	},
	{
		name: 'Jalpa',
		password: bcrypt.hashSync('123456'),
		email: 'c@b.com',
	},
]

export default users
