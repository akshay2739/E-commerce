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
	const [selectedSize, setselectedSize] = useState(0)
	const [selectedStock, setSelectedStock] = useState(0)

	const productResponse = useSelector((state) => {
		return state.productDetail
	})

	const { loading, product, error } = productResponse

	useEffect(() => {
		window.scrollTo(0, 0)
		dispatch(productDetail(match.params.id))
	}, [dispatch, match.params.id])

	const addQuantity = () => {
		if (quantity >= selectedStock) {
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
		history.push(
			`/cart/${match.params.id}?qty=${quantity}?size=${selectedSize}`
		)
	}

	const handleSizeChange = (e) => {
		switch (e.target.value) {
			case 's':
				setselectedSize('S')
				setSelectedStock(product.countInStock_S)
				break

			case 'm':
				setselectedSize('M')
				setSelectedStock(product.countInStock_M)
				break

			case 'l':
				setselectedSize('L')
				setSelectedStock(product.countInStock_L)
				break

			case 'xl':
				setselectedSize('XL')
				setSelectedStock(product.countInStock_XL)
				break

			case 'xxl':
				setselectedSize('XXL')
				setSelectedStock(product.countInStock_XXL)
				break

			case '0':
				setselectedSize(0)
				setSelectedStock(0)

			default:
				break
		}
		setQuantity(1)
	}

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Go back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				history.replace({ pathname: '/*', state: 'Product Not Found' })
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
												<Form.Control
													as='select'
													size='sm'
													onChange={(e) => handleSizeChange(e)}
												>
													<option value='0'>Size</option>
													<option value='s'>S</option>
													<option value='m'>M</option>
													<option value='l'>L</option>
													<option value='xl'>XL</option>
													<option value='xxl'>XXL</option>
												</Form.Control>
											</Form.Group>
										</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Row>
										<Col>Status :</Col>
										<Col>
											{selectedSize === 0 ? (
												<strong className='text-dark'>Select Size</strong>
											) : selectedStock > 0 ? (
												<strong className='text-success'>In stock</strong>
											) : (
												<strong className='text-danger'>Out of stock</strong>
											)}
										</Col>
									</Row>
								</ListGroup.Item>
								{selectedStock > 0 && (
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
										disabled={
											(selectedStock === 0 ? true : false) || selectedSize === 0
										}
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
