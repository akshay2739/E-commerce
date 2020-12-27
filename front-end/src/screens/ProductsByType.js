import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap'

import Product from '../components/Product'
import { listProductsByType } from '../action/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductByType = ({ match }) => {
	const dispatch = useDispatch()
	const productList = useSelector((state) => {
		return state.productList
	})

	const { loading, error, products } = productList

	useEffect(() => {
		console.log(match.params.type)
		dispatch(listProductsByType(match.params.type))
	}, [dispatch, match])

	return (
		<Container>
			<h1>{match.params.type.toUpperCase()}</h1>
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

export default ProductByType
