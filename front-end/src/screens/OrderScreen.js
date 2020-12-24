import React from 'react'
import { Col, Row, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { getOrderDetails } from '../action/orderAction'
import { useEffect } from 'react'

const OrderScreen = ({ match }) => {
	const orderId = match.params.id

	const dispatch = useDispatch()

	const orderDetails = useSelector((state) => state.orderDetailsReducer)
	const { order, error, loading } = orderDetails

	useEffect(() => {
		if (!order || order.id != orderId) {
			dispatch(getOrderDetails(orderId))
		}
		// eslint-disable-next-line
	}, [dispatch, orderId, order])

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<>
			<h1>Order {orderId}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Name : </strong>
								{order.user.name}
							</p>
							<p>
								<strong>Email : </strong>
								{order.user.email}
							</p>
							<p>
								<strong>Address : </strong>
								{order.address} , {order.city} ,{order.postalCode} ,{' '}
								{order.country}
							</p>
							{order.isPaid ? (
								<Message variant='success'>
									Delivered on {order.deliverdAt}
								</Message>
							) : (
								<Message variant='danger'>Not Delivered</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method : </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant='success'>Paid on {order.paidAt}</Message>
							) : (
								<Message variant='danger'>Not paid</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{order.products.length === 0 ? (
								<Message>Orders is empty.</Message>
							) : (
								<ListGroup variant='flush'>
									{order.products.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row className='align-items-center text-center'>
												<Col md={2} xs={4}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>

												<Col xs={6}>
													<Link to={`product/${item.id}`}>{item.name}</Link>
												</Col>

												<Col md={4} xs={12}>
													{item.orderItem.quantity} x $ {item.price} = ${' '}
													{item.orderItem.quantity * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>

				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Items Price</Col>
									<Col>$ {order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Shipping Price</Col>
									<Col>$ {order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Tax Price</Col>
									<Col>$ {order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Total Price</Col>
									<Col>$ {order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default OrderScreen
