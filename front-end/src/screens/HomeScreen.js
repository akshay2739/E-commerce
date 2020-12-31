import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Image, Card } from 'react-bootstrap'

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
					<h1>New arrivals</h1>
					<ProductCarousel />
				</>
			) : (
				<Link to='/' className='btn btn-light'>
					Go back
				</Link>
			)}

			<h1>Shop by Category</h1>

			<Row>
				<Col md={4} xs={12} style={{ marginTop: 15 }}>
					<Link to='/products/men' className='shadow'>
						<Image src='/images/men.webp' fluid rounded />
					</Link>
				</Col>

				<Col md={4} xs={12} style={{ marginTop: 15 }}>
					<Link to='products/women' className='shadow'>
						<Image src='/images/women.webp' fluid rounded />
					</Link>
				</Col>

				<Col md={4} xs={12} style={{ marginTop: 15 }}>
					<Link to='products/kids' className='shadow'>
						<Image src='/images/special.jpg' fluid rounded />
					</Link>
				</Col>
			</Row>

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

			<h1>Why choose us</h1>
			<Row>
				<Col md={4} xs={12}>
					<Card
						style={{ padding: 15, marginTop: 15, marginBottom: 15 }}
						className='shadow'
					>
						<Card.Title>Reason 1</Card.Title>
						<Card.Text>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Consequuntur architecto accusantium sint doloribus quam animi
							molestias necessitatibus esse quaerat vero sunt non ratione nihil,
							quas mollitia magnam eos voluptatum ex?
						</Card.Text>
					</Card>
				</Col>

				<Col md={4} xs={12}>
					<Card
						style={{ padding: 15, marginTop: 15, marginBottom: 15 }}
						className='shadow'
					>
						<Card.Title>Reason 2</Card.Title>
						<Card.Text>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Consequuntur architecto accusantium sint doloribus quam animi
							molestias necessitatibus esse quaerat vero sunt non ratione nihil,
							quas mollitia magnam eos voluptatum ex?
						</Card.Text>
					</Card>
				</Col>

				<Col md={4} xs={12}>
					<Card
						style={{ padding: 15, marginTop: 15, marginBottom: 15 }}
						className='shadow'
					>
						<Card.Title>Reason 3</Card.Title>
						<Card.Text>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Consequuntur architecto accusantium sint doloribus quam animi
							molestias necessitatibus esse quaerat vero sunt non ratione nihil,
							quas mollitia magnam eos voluptatum ex?
						</Card.Text>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default HomeScreen
