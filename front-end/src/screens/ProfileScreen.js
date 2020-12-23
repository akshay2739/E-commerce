import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { getUserDetails, updateUserDetails } from '../action/userAction'

const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)

	const dispatch = useDispatch()

	const userDetails = useSelector((state) => state.userDetailsReducer)

	const { loading, error, user } = userDetails

	const userLogin = useSelector((state) => state.userLoginReducer)
	const { userInfo } = userLogin

	const updatedUserInfo = useSelector((state) => state.userUpdateReducer)
	const { success } = updatedUserInfo

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		} else {
			if (!user.name) {
				dispatch(getUserDetails('profile'))
			} else {
				setName(user.name)
				setEmail(user.email)
			}
		}
	}, [dispatch, history, userInfo, redirect, user])

	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessage('Passwords do not match')
		} else {
			dispatch(updateUserDetails({ id: user.id, name, email, password }))
		}
	}

	return (
		<Container>
			<Row>
				<Col md={3}>
					<h2>User Profile</h2>
					{error && <Message variant='danger'>{error}</Message>}
					{success && <Message variant='success'>Profile Updated</Message>}
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
							Update
						</Button>
					</Form>
				</Col>
				<Col md={9}>My Orders</Col>
			</Row>
		</Container>
	)
}

export default ProfileScreen
