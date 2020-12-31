import React from 'react'
import { Button, Col, Row, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { Link } from 'react-router-dom'
import { createOrder } from '../action/orderAction'
import { useEffect } from 'react'
import Meta from '../components/Meta'
import { ORDER_CREATE_RESET } from '../constant/orderConstant'
import { USER_DETAILS_RESET } from '../constant/user.constant'

const PlaceOrder = ({ history }) => {
	const cart = useSelector((state) => state.cart)

	if (!cart.orderType) {
		history.push('/shipping')
	} else if (!cart.paymentMethod) {
		history.push('/payment')
	}

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
		orderType,
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
		window.scrollTo(0, 0)
		if (success) {
			history.push(`/order/${order.id}`)
			dispatch({ type: USER_DETAILS_RESET })
			dispatch({ type: ORDER_CREATE_RESET })
		}
		// eslint-disable-next-line
	}, [history, success, dispatch])

	const placeOrderHandler = async () => {
		dispatch(
			createOrder({
				cartItems,
				orderType,
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
			<Meta title='My-Shop | Place Order' />
			<CheckoutSteps step1 step2 step3 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							{cart.orderType === 'takeAway' ? (
								<p>Take away</p>
							) : (
								<p>
									<strong>Address : </strong>
									{cart.shippingAddress.address} , {cart.shippingAddress.city} ,
									{cart.shippingAddress.postalCode} , {cart.country}
								</p>
							)}
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
												<Col md={2} xs={4}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>

												<Col md={6} xs={8}>
													<Link to={`product/${item.id}`}>{item.name}</Link>
												</Col>

												<Col md={4} xs={12}>
													{item.quantity} X $ {item.price} = ${' '}
													<strong> {item.quantity * item.price}</strong>
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
									<Col>
										$ <strong> {cart.totalPrice}</strong>
									</Col>
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
