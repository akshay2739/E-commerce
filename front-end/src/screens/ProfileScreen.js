import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Row, Col, Button, Container, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserDetails } from '../action/userAction'
import { listMyOrders } from '../action/orderAction'
import { USER_UPDATE_PROFILE_RESET } from '../constant/user.constant'

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

	const myOrderList = useSelector((state) => state.myOrdersListReducer)
	const { loading: loadingOrders, orders, error: errorOrders } = myOrderList

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		window.scrollTo(0, 0)
		if (!userInfo) {
			history.push('/login')
		} else {
			if (!user.name || success) {
				dispatch({ type: USER_UPDATE_PROFILE_RESET })
				dispatch(getUserDetails('profile'))
				dispatch(listMyOrders())
			} else {
				setName(user.name)
				setEmail(user.email)
			}
		}
	}, [dispatch, history, userInfo, redirect, user, success])

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
				<Col md={9}>
					<h2>My Orders</h2>
					{loadingOrders ? (
						<Loader />
					) : errorOrders ? (
						<Message variant='danger'>{errorOrders}</Message>
					) : (
						<Table
							striped
							bordered
							hover
							responsive
							className='table-sm text-center'
						>
							<thead>
								<tr>
									<th>ID</th>
									<th>DATE</th>
									<th>TOTAL</th>
									<th>PAID</th>
									<th>DELIVERED</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr key={order.id}>
										<td>{order.id}</td>
										<td>{order.createdAt.substring(0, 10)}</td>
										<td>{order.totalPrice}</td>
										<td>
											{order.isPaid ? (
												order.paidAt.substring(0, 10)
											) : (
												<i
													className='fas fa-times'
													style={{ color: 'red' }}
												></i>
											)}
										</td>
										<td>
											{order.isDelivered ? (
												order.deliveredAt.substring(0, 10)
											) : (
												<i
													className='fas fa-times'
													style={{ color: 'red' }}
												></i>
											)}
										</td>
										<td>
											{
												<LinkContainer to={`/order/${order.id}`}>
													<Button className='btn-sm' variant='light'>
														Details
													</Button>
												</LinkContainer>
											}
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}
				</Col>
			</Row>
		</Container>
	)
}

export default ProfileScreen
