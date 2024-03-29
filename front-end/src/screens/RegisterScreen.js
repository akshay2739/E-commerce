import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../action/userAction'
import Meta from '../components/Meta'

const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)

	const dispatch = useDispatch()

	const userRegister = useSelector((state) => state.userRegisterReducer)
	const { loading, error, userInfo } = userRegister
	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		window.scrollTo(0, 0)
		if (userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessage('Passwords do not match')
		} else {
			dispatch(register(name, email, password))
		}
	}

	return (
		<FormContainer>
			<Meta title='My-Shop | Register' />
			<h1>Sign Up</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{message && <Message variant='danger'>{message}</Message>}
			{loading && <Loader></Loader>}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='name'
						placeholder='Enter name'
						value={name}
						required
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter Email'
						value={email}
						required
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='password'>
					<Form.Label>Enter Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						required
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm password'
						value={confirmPassword}
						required
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button variant='primary' type='submit'>
					Sign up
				</Button>

				<Row className='py-3'>
					<Col>
						Have an existing account ?{' '}
						<Link to={redirect ? `/login/?redirect=${redirect}` : '/login'}>
							Login
						</Link>
					</Col>
				</Row>
			</Form>
		</FormContainer>
	)
}

export default RegisterScreen
