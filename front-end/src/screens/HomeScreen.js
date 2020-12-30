import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'

import Product from '../components/Product'
import { listProducts } from '../action/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import ProductCarousel from '../components/ProductCarousel'
import { Link } from 'react-router-dom'
import LandingCarousel from '../components/LandingCarousel'

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword

	const pageNumber = match.params.pageNumber || 1
	console.log(pageNumber)
	const dispatch = useDispatch()

	const productList = useSelector((state) => {
		return state.productsList
	})

	const { loading, error, products, page, pages } = productList

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber))
	}, [dispatch, keyword, pageNumber])

	return (
		<>
			<Meta title='Welcome to My-Shop' />
			{!keyword ? (
				<>
					<LandingCarousel />
					<ProductCarousel />
				</>
			) : (
				<Link to='/' className='btn btn-light'>
					Go back
				</Link>
			)}
			<h1>Latest Products</h1>
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
					<Paginate
						page={page}
						pages={pages}
						keyword={keyword ? keyword : ''}
					/>
				</>
			)}
		</>
	)
}

export default HomeScreen
