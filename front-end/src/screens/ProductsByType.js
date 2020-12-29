import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap'

import Product from '../components/Product'
import { listProductsByType } from '../action/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'

const ProductByType = ({ match }) => {
	const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch()
	const productList = useSelector((state) => {
		return state.productsList
	})

	const { loading, error, products, page, pages } = productList

	useEffect(() => {
		console.log(match.params.type)
		dispatch(listProductsByType(match.params.type, pageNumber))
	}, [dispatch, match, pageNumber])

	return (
		<Container>
			<h1>{match.params.type.toUpperCase()}</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
						{products.map((product) => (
							<Col sm={12} md={6} lg={4} xl={3} key={product.id}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate page={page} pages={pages} pageType={match.params.type} />
				</>
			)}
		</Container>
	)
}

export default ProductByType
