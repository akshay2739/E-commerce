import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap'

import Product from '../components/Product'
import { listProductsByType } from '../action/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'

const ProductByType = ({ match }) => {
	const pageNumber = match.params.pageNumber || 1

	const [size, setSize] = useState('all')
	const [sort, setSort] = useState('all')
	const [type, setType] = useState('all')

	const dispatch = useDispatch()
	const productList = useSelector((state) => {
		return state.productsList
	})

	const { loading, error, products, page, pages } = productList

	useEffect(() => {
		window.scrollTo(0, 0)
		dispatch(listProductsByType(match.params.type, pageNumber))
	}, [dispatch, match, pageNumber])

	const handleFilterSubmit = (e) => {
		e.preventDefault()
		console.log('hello')
	}

	return (
		<>
			<Meta title={`My-Shop | ${match.params.type.toUpperCase()}`} />
			<Row>
				<Col>
					<h1>{match.params.type.toUpperCase()}</h1>
					<Form onSubmit={handleFilterSubmit}>
						<Row className='align-items-center'>
							<Col md={3} xs={6}>
								<Form.Label>Sort by</Form.Label>
								<Form.Control as='select' size='sm'>
									<option value='all' defaultValue>
										All
									</option>
									<option>Price:High to Low</option>
									<option>Price:Low to High</option>
									<option>New to Old</option>
									<option>Old to New</option>
								</Form.Control>
							</Col>

							<Col md={3} xs={6}>
								<Form.Label>Type</Form.Label>
								<Form.Control as='select' size='sm'>
									<option value='all' defaultValue>
										All
									</option>
									<option>T-Shirt</option>
									<option>Shirt</option>
									<option>Hoodies</option>
									<option>Sweatshirt</option>
								</Form.Control>
							</Col>

							<Col md={3} xs={6}>
								<Form.Label>Size</Form.Label>
								<Form.Control as='select' size='sm'>
									<option value='all' defaultValue>
										All
									</option>
									<option>S</option>
									<option>M</option>
									<option>L</option>
									<option>XL</option>
									<option>XXL</option>
								</Form.Control>
							</Col>

							<Col md={3} xs={6}>
								<Button type='submit' className='btn btn-md'>
									Filter
								</Button>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
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
		</>
	)
}

export default ProductByType
