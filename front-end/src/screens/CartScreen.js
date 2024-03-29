import React, { useEffect } from 'react'
import { Button, Col, ListGroup, Row, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	addItemToCartAction,
	removeItemFromCartAction,
} from '../action/cartAction'
import Message from '../components/Message'
import Meta from '../components/Meta'

const CartScreen = ({ match, location, history }) => {
	const id = match.params.id

	const query = location.search.split('?')

	const quantity = query[1] ? Number(query[1].split('=')[1]) : 1

	const size = query[2] ? query[2].split('=')[1] : 'L'

	const dispatch = useDispatch()

	const cart = useSelector((state) => {
		return state.cart
	})

	const { cartItems } = cart

	useEffect(() => {
		window.scrollTo(0, 0)
		if (id) {
			dispatch(addItemToCartAction(id, quantity, size))
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
			<Meta title='My-Shop | Your cart' />
			<Row className='align-items-center'>
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
									<Row className='align-items-center'>
										<Col md={2} xs={4} classsName='my-auto'>
											<Image src={item.image} alt={item.name} fluid rounded />
										</Col>
										<Col md={3} xs={8}>
											<Link to={`/product/${item.id}`}>{item.name}</Link>
										</Col>
										<Col md={2} xs={4}>
											Size : <strong>{size}</strong>
										</Col>
										<Col md={1} xs={3}>
											<strong>{item.quantity} </strong> x
										</Col>
										<Col md={2} xs={3}>
											$ <strong>{item.price}</strong>
										</Col>
										<Col md={2} xs={2}>
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
								<h2>Subtotal</h2>
							</ListGroup.Item>

							<ListGroup.Item>
								items :{' '}
								<strong>
									{' '}
									{cartItems.reduce((acc, item) => acc + item.quantity, 0)}
								</strong>
							</ListGroup.Item>

							<ListGroup.Item>
								total : $
								<strong>
									{cartItems
										.reduce((acc, item) => acc + item.quantity * item.price, 0)
										.toFixed(2)}
								</strong>
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
