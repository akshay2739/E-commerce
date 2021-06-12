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

	console.log(product)
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
				setselectedSize(
					product.category === 'jackets' || product.category === 'suits'
						? '34'
						: 'S'
				)
				setSelectedStock(product.countInStock_S_34)
				break

			case 'm':
				setselectedSize(
					product.category === 'jackets' || product.category === 'suits'
						? '36'
						: 'M'
				)
				setSelectedStock(product.countInStock_M_36)
				break

			case 'l':
				setselectedSize(
					product.category === 'jackets' || product.category === 'suits'
						? '38'
						: 'L'
				)
				setSelectedStock(product.countInStock_L_38)
				break

			case 'xl':
				setselectedSize(
					product.category === 'jackets' || product.category === 'suits'
						? '40'
						: 'XL'
				)
				setSelectedStock(product.countInStock_XL_40)
				break

			case 'xxl':
				setselectedSize(
					product.category === 'jackets' || product.category === 'suits'
						? '42'
						: '2XL'
				)
				setSelectedStock(product.countInStock_2XL_42)
				break

			case '3xl':
				setselectedSize(
					product.category === 'jackets' || product.category === 'suits'
						? '44'
						: '3XL'
				)
				setSelectedStock(product.countInStock_3XL_44)
				break

			case '4xl':
				setselectedSize(
					product.category === 'jackets' || product.category === 'suits'
						? '46'
						: '4XL'
				)
				setSelectedStock(product.countInStock_4XL_46)
				break

			case '5xl':
				setselectedSize(
					product.category === 'jackets' || product.category === 'suits'
						? '48'
						: '5XL'
				)
				setSelectedStock(product.countInStock_5XL_48)
				break

			case '6xl':
				setselectedSize(
					product.category === 'jackets' || product.category === 'suits'
						? '50'
						: '6XL'
				)
				setSelectedStock(product.countInStock_6XL_50)
				break

			case '52':
				setselectedSize('52')
				setSelectedStock(product.countInStock_52)
				break

			case '54':
				setselectedSize('54')
				setSelectedStock(product.countInStock_54)
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
							{product.category === 'suits' && selectedSize ? (
								<ListGroup.Item>
									<ul>
										<li>Blazer size : {selectedSize}</li>
										<li>Pants size : {parseInt(selectedSize) - 6}</li>
									</ul>
								</ListGroup.Item>
							) : null}
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
													<option value='s'>
														{product.category === 'jackets' ||
														product.category === 'suits'
															? '34'
															: 'S'}
													</option>
													<option value='m'>
														{product.category === 'jackets' ||
														product.category === 'suits'
															? '36'
															: 'M'}
													</option>
													<option value='l'>
														{product.category === 'jackets' ||
														product.category === 'suits'
															? '38'
															: 'L'}
													</option>
													<option value='xl'>
														{product.category === 'jackets' ||
														product.category === 'suits'
															? '40'
															: 'XL'}
													</option>
													<option value='xxl'>
														{product.category === 'jackets' ||
														product.category === 'suits'
															? '42'
															: '2XL'}
													</option>
													<option value='3xl'>
														{product.category === 'jackets' ||
														product.category === 'suits'
															? '44'
															: '3XL'}
													</option>
													<option value='4xl'>
														{product.category === 'jackets' ||
														product.category === 'suits'
															? '46'
															: '4XL'}
													</option>
													<option value='5xl'>
														{product.category === 'jackets' ||
														product.category === 'suits'
															? '48'
															: '5XL'}
													</option>
													<option value='6xl'>
														{product.category === 'jackets' ||
														product.category === 'suits'
															? '50'
															: '6XL'}
													</option>
													{product.category === 'jackets' ||
													product.category === 'suits' ? (
														<option value='52'>52</option>
													) : null}
													{product.category === 'jackets' ||
													product.category === 'suits' ? (
														<option value='54'>54</option>
													) : null}
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
