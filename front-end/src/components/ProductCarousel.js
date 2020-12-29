import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Image, Carousel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listNewProducts } from '../action/productAction'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'

const ProductCarousel = () => {
	const dispatch = useDispatch()

	const newProducts = useSelector((state) => state.productNewList)
	const { loading, error, products } = newProducts

	useEffect(() => {
		dispatch(listNewProducts())
	}, [dispatch])

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<Carousel pause='hover' className='bg-dark'>
			{products.map((product) => (
				<Carousel.Item key={product.id}>
					<Link to={`product/${product.id}`}>
						<Image src={product.image} alt={product.name} fluid />
						<Carousel.Caption className='carouser-caption'>
							<h2>{product.name}</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	)
}

export default ProductCarousel
