import React from 'react'
import { Button, Col, Row, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { Link } from 'react-router-dom'
import { createOrder } from '../action/orderAction'
import { useEffect } from 'react'

const PlaceOrder = ({ history }) => {
	const cart = useSelector((state) => state.cart)

	const dispatch = useDispatch()

	const addDecimal = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2)
	}

	cart.itemsPrice = addDecimal(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
	)

	cart.shippingPrice = addDecimal(cart.itemsPrice > 300 ? 0 : 25)

	cart.taxPrice = addDecimal(Number((cart.itemsPrice * 0.15).toFixed(2)))

	cart.totalPrice = (
		Number(cart.itemsPrice) +
		Number(cart.taxPrice) +
		Number(cart.shippingPrice)
	).toFixed(2)

	const {
		cartItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		shippingPrice,
		taxPrice,
		totalPrice,
	} = cart

	const orderCreate = useSelector((state) => state.orderCreateReducer)
	const { order, success, error } = orderCreate

	useEffect(() => {
		if (success) {
			history.push(`/order/${order.id}`)
		}
		// eslint-disable-next-line
	}, [history, success])

	const placeOrderHandler = async () => {
		dispatch(
			createOrder({
				cartItems,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
			})
		)
	}
	return (
		<>
			<CheckoutSteps step1 step2 step3 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address : </strong>
								{cart.shippingAddress.address} , {cart.shippingAddress.city} ,
								{cart.shippingAddress.postalCode} , {cart.country}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method : </strong>
								{cart.paymentMethod}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{cart.cartItems.length === 0 ? (
								<Message>Your Cart is empty.</Message>
							) : (
								<ListGroup variant='flush'>
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row className='align-items-center'>
												<Col md={2} xs={2}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>

												<Col md={6} xs={6}>
													<Link to={`product/${item.id}`}>{item.name}</Link>
												</Col>

												<Col md={4} xs={4}>
													{item.quantity} X $ {item.price} = ${' '}
													{item.quantity * item.price}
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
									<Col>$ {cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Shipping Price</Col>
									<Col>$ {cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Tax Price</Col>
									<Col>$ {cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Total Price</Col>
									<Col>$ {cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>

							{error && (
								<ListGroup.Item>
									<Message variant='danger'>{error}</Message>
								</ListGroup.Item>
							)}

							<ListGroup.Item>
								<Button
									type='button'
									className='btn-block'
									disabled={!cart.cartItems.length}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default PlaceOrder
