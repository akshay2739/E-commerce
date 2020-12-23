import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	Button,
	Card,
	Col,
	Container,
	Image,
	ListGroup,
	Row,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { productDetail } from '../action/productAction'

import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({ history, match }) => {
	const dispatch = useDispatch()

	const [quantity, setQuantity] = useState(1)

	const productResponse = useSelector((state) => {
		return state.productDetail
	})
	const { loading, product, error } = productResponse

	useEffect(() => {
		dispatch(productDetail(match.params.id))
	}, [dispatch, match.params.id])

	const addQuantity = () => {
		if (quantity >= product.countInStock_S) {
			return
		}
		const oldQuantity = quantity
		const newQuantity = oldQuantity + 1
		setQuantity(newQuantity)
	}

	const removeQuantity = () => {
		if (quantity <= 1) {
			return
		}
		const oldQuantity = quantity
		const newQuantity = oldQuantity - 1
		setQuantity(newQuantity)
	}

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${quantity}`)
	}

	return (
		<Container>
			<Link className='btn btn-light my-3' to='/'>
				Go back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={4}>
						<Image src={product.image} alt={product.name} fluid rounded />
					</Col>
					<Col md={4}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>Price : $ {product.price}</ListGroup.Item>
							<ListGroup.Item>
								Description : {product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={4}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Price :</Col>
										<Col>
											<strong>{product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Row>
										<Col>Status :</Col>
										<Col>
											{product.countInStock_S > 0
												? 'In stock'
												: 'Out of  stock'}
										</Col>
									</Row>
								</ListGroup.Item>
								{product.countInStock_S > 0 && (
									<ListGroup.Item>
										<Row>
											<Col className='mt-1'>Quantity :</Col>
											<Col>
												<Button onClick={removeQuantity} size='sm'>
													-
												</Button>
												<span style={{ margin: 10 }}>{quantity}</span>
												<Button onClick={addQuantity} size='sm'>
													+
												</Button>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button
										onClick={addToCartHandler}
										className='btn-block'
										type='button'
										disabled={product.countInStock === 0 ? true : false}
									>
										Add To Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</Container>
	)
}

export default ProductScreen
