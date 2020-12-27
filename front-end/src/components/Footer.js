import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'

function Copyright() {
	return (
		<Typography variant='body2' color='white'>
			{'Copyright ©  '}
			<Link color='inherit' href='#'>
				My-Shop
			</Link>
			{'  '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
	},
	footer: {
		padding: theme.spacing(3, 2),
		marginTop: 'auto',
		textAlign: 'center',
		color: 'white',
		backgroundColor: ' #4582ec',
	},
}))

const Footer = () => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			{/* <CssBaseline /> */}
			<footer className={classes.footer}>
				<Container maxWidth='sm'>
					<Typography variant='body1'>My-Shop</Typography>
					<Copyright />
				</Container>
			</footer>
		</div>
	)
}

export default Footer
