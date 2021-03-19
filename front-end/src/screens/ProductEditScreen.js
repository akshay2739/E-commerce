import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { productDetail, updateProduct } from '../action/productAction'
import { PRODUCT_UPDATE_RESET } from '../constant/product.constant'
import axios from 'axios'

const ProductEditScreen = ({ match, history }) => {
	const productID = match.params.id

	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [image, setImage] = useState('')
	const [category, setCategory] = useState('mens')
	const [size, setSize] = useState('')
	const [description, setDescription] = useState('')
	const [countInStock_S, setCountInStock_S] = useState(0)
	const [countInStock_M, setCountInStock_M] = useState(0)
	const [countInStock_L, setCountInStock_L] = useState(0)
	const [countInStock_XL, setCountInStock_XL] = useState(0)
	const [countInStock_XXL, setCountInStock_XXL] = useState(0)
	const [uploading, setUploading] = useState(false)

	const dispatch = useDispatch()

	const productDetails = useSelector((state) => state.productDetail)
	const { loading, error, product } = productDetails

	const productUpdate = useSelector((state) => state.productUpdate)
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate

	useEffect(() => {
		window.scrollTo(0, 0)
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET })
			history.push('/admin/productlist')
		} else {
			if (!product.name || product.id !== productID) {
				dispatch(productDetail(productID))
			} else {
				setName(product.name)
				setPrice(product.price)
				setImage(product.image)
				setCategory(product.category)
				setDescription(product.description)
				setSize(product.size)
				setCountInStock_L(product.countInStock_L)
				setCountInStock_S(product.countInStock_S)
				setCountInStock_M(product.countInStock_M)
				setCountInStock_XL(product.countInStock_XL)
				setCountInStock_XXL(product.countInStock_XXL)
			}
		}
	}, [product, dispatch, productID, successUpdate, history])

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('image', file)
		setUploading(true)

		try {
			const config = {
				headers: {
					'Content-type': 'multipart/form-data',
				},
			}

			const { data } = await axios.post('/api/upload', formData, config)

			setImage(data)
			setUploading(false)
		} catch (error) {
			console.log(error)
			setUploading(false)
		}
	}

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateProduct({
				id: productID,
				name,
				price,
				image,
				category,
				size,
				description,
				countInStock_S,
				countInStock_M,
				countInStock_XL,
				countInStock_L,
				countInStock_XXL,
			})
		)
	}

	return (
		<>
			<Link to='/admin/productlist' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Ener Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter name'
								value={name}
								required
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='Price'>
							<Form.Label>Enter Price</Form.Label>
							<Form.Control
								type='text'
								placeholder='Price'
								value={price}
								required
								onChange={(e) => setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='addimage'>
							<Form.Label>Add Image</Form.Label>
							<Form.Control
								type='text'
								placeholder='Image'
								value={image}
								required
								onChange={(e) => setImage(e.target.value)}
							></Form.Control>
							<Form.File
								id='image-file'
								label='Choose File'
								custom
								onChange={uploadFileHandler}
							/>
							{uploading && <Loader />}
						</Form.Group>

						<Row>
							<Col md={6}>
								<Form.Group controlId='category'>
									<Form.Label>Select Category</Form.Label>
									<Form.Control
										type='text'
										placeholder='Category'
										value={category}
										required
										onChange={(e) => setCategory(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId='countInStock_S'>
									<Form.Label>Stock of S</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter Stock of S'
										value={countInStock_S}
										required
										onChange={(e) => setCountInStock_S(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>

						<Row>
							<Col md={6}>
								<Form.Group controlId='countInStock_M'>
									<Form.Label>Stock of M</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter Stock of M'
										value={countInStock_M}
										required
										onChange={(e) => setCountInStock_M(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId='countInStock_L'>
									<Form.Label>Stock of L</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter Stock of L'
										value={countInStock_L}
										required
										onChange={(e) => setCountInStock_L(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Form.Group controlId='countInStock_XXL'>
									<Form.Label>Stock of XXL</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter Stock of XXL'
										value={countInStock_XXL}
										required
										onChange={(e) => setCountInStock_XXL(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>

							<Col md={6}>
								<Form.Group controlId='countInStock_XL'>
									<Form.Label>Stock of XL</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter Stock of XL'
										value={countInStock_XL}
										required
										onChange={(e) => setCountInStock_XL(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>

						<Form.Group controlId='description'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								type='text'
								placeholder='Description'
								value={description}
								required
								onChange={(e) => setDescription(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Button variant='primary' type='submit'>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	)
}

export default ProductEditScreen
