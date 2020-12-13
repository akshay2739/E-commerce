import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Rating from '../components/Rating'

const ProductScreen = ({ match }) => {
	const [product, setProduct] = useState({})

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const res = await Axios.get(`/api/products/${match.params.id}`)
				setProduct(res.data)
			} catch (error) {
				console.log(error)
			}
		}
		fetchProduct()
	}, [match])

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Go back
			</Link>
			<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.name} fluid />
				</Col>
				<Col md={3}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h3>{product.name}</h3>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating
								value={product.rating}
								text={`${product.numReviews} Reviews`}
							/>
						</ListGroup.Item>
						<ListGroup.Item>Price : $ {product.price}</ListGroup.Item>
						<ListGroup.Item>Description : {product.description}</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
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
										{product.countInStock > 0 ? 'In stock' : 'Out of  stock'}
									</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Button
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
		</>
	)
}

export default ProductScreen
