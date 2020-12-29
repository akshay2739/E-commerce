import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap'

import Product from '../components/Product'
import { listProducts } from '../action/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword

	const dispatch = useDispatch()
	const productList = useSelector((state) => {
		return state.productsList
	})

	const { loading, error, products } = productList
	console.log(products)
	useEffect(() => {
		dispatch(listProducts(keyword))
	}, [dispatch, keyword])

	return (
		<Container>
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					{products.map((product) => (
						<Col sm={12} md={6} lg={4} xl={3} key={product.id}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</Container>
	)
}

export default HomeScreen
