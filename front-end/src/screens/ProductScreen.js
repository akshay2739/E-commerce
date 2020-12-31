import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Col, Image, ListGroup, Row, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { productDetail } from '../action/productAction'
import Meta from '../components/Meta'
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
		window.scrollTo(0, 0)
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
		<>
			<Link className='btn btn-light my-3' to='/'>
				Go back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Meta title={product.name} />
					<Col md={4}>
						<Image src={product.image} alt={product.name} fluid rounded />
					</Col>
					<Col md={4}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								Price : <strong>$ {product.price}</strong>
							</ListGroup.Item>
							<ListGroup.Item>
								Description : <strong> {product.description}</strong>
							</ListGroup.Item>
							<ListGroup.Item>
								<strong className='text-danger'>
									No Refunds. Only Exchange within 15 days.
								</strong>
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
											<strong>$ {product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Row className='align-items-center'>
										<Col>
											<Form.Label>Size</Form.Label>
										</Col>
										<Col>
											<Form.Group
												controlId='exampleForm.ControlSelect1'
												className='my-auto'
											>
												<Form.Control as='select' size='sm'>
													<option className='text-center'>S</option>
													<option>M</option>
													<option>L</option>
													<option>XL</option>
													<option>XXL</option>
												</Form.Control>
											</Form.Group>
										</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Row>
										<Col>Status :</Col>
										<Col>
											{product.countInStock_S > 0 ? (
												<strong className='text-success'>In stock</strong>
											) : (
												<strong className='text-danger'>Out of stock</strong>
											)}
										</Col>
									</Row>
								</ListGroup.Item>
								{product.countInStock_S > 0 && (
									<ListGroup.Item>
										<Row>
											<Col className='mt-1'>Quantity :</Col>
											<Col>
												<Button onClick={removeQuantity} size='sm'>
													<i class='fas fa-minus'></i>
												</Button>
												<span style={{ margin: 10 }}>{quantity}</span>
												<Button onClick={addQuantity} size='sm'>
													<i class='fas fa-plus'></i>
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
		</>
	)
}

export default ProductScreen
