import React, { useEffect } from 'react'
import { Button, Col, ListGroup, Row, Image, Form, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	addItemToCartAction,
	removeItemFromCartAction,
} from '../action/cartAction'
import Message from '../components/Message'

const CartScreen = ({ match, location, history }) => {
	const id = match.params.id

	const quantity = location.search ? Number(location.search.split('=')[1]) : 1

	const dispatch = useDispatch()

	const cart = useSelector((state) => {
		return state.cart
	})

	const { cartItems } = cart

	useEffect(() => {
		if (id) {
			dispatch(addItemToCartAction(id, quantity))
		}
	}, [dispatch, id, quantity])

	const removeFromCart = (productId) => {
		dispatch(removeItemFromCartAction(productId))
	}

	const checkoutHandler = () => {
		history.push('/login?redirect=shipping')
	}

	return (
		<>
			<Row>
				<Col md={8}>
					<h1>Shopping cart</h1>
					{cartItems.length === 0 ? (
						<Message>
							Your cart is empty <Link to='/'>Go back</Link>
						</Message>
					) : (
						<ListGroup variant='flush'>
							{cartItems.map((item) => (
								<ListGroup.Item key={item.id}>
									<Row>
										<Col md={2}>
											<Image src={item.image} alt={item.name} fluid rounded />
										</Col>
										<Col md={2}>
											<Link to={`/product/${item.id}`}>{item.name}</Link>
										</Col>
										<Col md={2}>Size : L</Col>
										<Col md={2}>Quantity : {item.quantity}</Col>
										<Col md={2}>$ {item.price}</Col>
										<Col md={2}>
											<Button
												type='button'
												variant='light'
												onClick={() => removeFromCart(item.id)}
											>
												<i className='fas fa-trash'></i>
											</Button>
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					)}
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>
									Subtotal (
									{cartItems.reduce((acc, item) => acc + item.quantity, 0)})
									items
								</h2>
								$
								{cartItems
									.reduce((acc, item) => acc + item.quantity * item.price, 0)
									.toFixed(2)}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type='buttom'
									className='btn-block'
									disabled={cartItems.length === 0}
									onClick={() => checkoutHandler()}
								>
									Proceed to checkout
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default CartScreen
