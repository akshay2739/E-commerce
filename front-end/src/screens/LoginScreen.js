import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../action/userAction'
import Meta from '../components/Meta'

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLoginReducer)
	const { loading, error, userInfo } = userLogin

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		window.scrollTo(0, 0)
		if (userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(login(email, password))
	}

	return (
		<FormContainer>
			<Meta title='My-Shop | Login' />
			<h1>Sign in</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader></Loader>}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						required
						type='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Email Password</Form.Label>
					<Form.Control
						required
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button variant='primary' type='submit'>
					Sign in
				</Button>

				<Row className='py-3'>
					<Col>
						New Customer ?{' '}
						<Link
							to={redirect ? `/register?redirect=${redirect}` : '/register'}
						>
							Register
						</Link>
					</Col>
				</Row>
			</Form>
		</FormContainer>
	)
}

export default LoginScreen
