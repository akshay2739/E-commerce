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
	const [selectedGender, setSelectedGender] = useState('men')
	const [selectedcategory, setSelectedcategory] = useState('shirts')
	const [size, setSize] = useState('')
	const [description, setDescription] = useState('')
	const [countInStock_S_34, setCountInStock_S] = useState(0)
	const [countInStock_M_36, setCountInStock_M] = useState(0)
	const [countInStock_L_38, setCountInStock_L] = useState(0)
	const [countInStock_XL_40, setCountInStock_XL] = useState(0)
	const [countInStock_2XL_42, setCountInStock_XXL] = useState(0)
	const [countInStock_3XL_44, setCountInStock_3XL_44] = useState(0)
	const [countInStock_4XL_46, setCountInStock_4XL_46] = useState(0)
	const [countInStock_5XL_48, setCountInStock_5XL_48] = useState(0)
	const [countInStock_6XL_50, setCountInStock_6XL_50] = useState(0)
	const [countInStock_52, setCountInStock_52] = useState(0)
	const [countInStock_54, setCountInStock_54] = useState(0)
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
				setSelectedGender(product.gender)
				setSelectedcategory(product.category)
				setDescription(product.description)
				setSize(product.size)
				setCountInStock_L(product.countInStock_L_38)
				setCountInStock_S(product.countInStock_S_34)
				setCountInStock_M(product.countInStock_M_36)
				setCountInStock_XL(product.countInStock_XL_40)
				setCountInStock_XXL(product.countInStock_2XL_42)
				setCountInStock_3XL_44(product.countInStock_3XL_44)
				setCountInStock_4XL_46(product.countInStock_4XL_46)
				setCountInStock_5XL_48(product.countInStock_5XL_48)
				setCountInStock_6XL_50(product.countInStock_6XL_50)
				setCountInStock_52(product.countInStock_52)
				setCountInStock_54(product.countInStock_54)
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

	const handleCategoryChange = (e) => {
		setSelectedcategory(e.target.value)
	}

	const handleGenderChange = (e) => {
		setSelectedGender(e.target.value)
	}

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateProduct({
				id: productID,
				name,
				price,
				image,
				category: selectedcategory,
				size,
				description,
				gender: selectedGender,
				countInStock_S_34,
				countInStock_M_36,
				countInStock_XL_40,
				countInStock_L_38,
				countInStock_2XL_42,
				countInStock_3XL_44,
				countInStock_4XL_46,
				countInStock_5XL_48,
				countInStock_6XL_50,
				countInStock_52,
				countInStock_54,
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
							<Form.Label>Enter Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter name'
								value={name}
								required
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Row>
							<Col md={6}>
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
							</Col>
							<Col md={6}>
								<Form.Group controlId='gender'>
									<Form.Label>Select Gender</Form.Label>
									<Form.Control
										as='select'
										size='md'
										onChange={(e) => handleGenderChange(e)}
									>
										<option value='men'>Men</option>
										<option value='women'>Women</option>
									</Form.Control>
								</Form.Group>
							</Col>
						</Row>

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
										as='select'
										size='md'
										onChange={(e) => handleCategoryChange(e)}
									>
										<option value='shirts'>Shirts</option>
										<option value='suits'>Suits</option>
										<option value='jackets'>Jackets</option>
									</Form.Control>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId='countInStock_S_34'>
									<Form.Label>
										Stock of{' '}
										{selectedcategory === 'jackets' ||
										selectedcategory === 'suits'
											? '34'
											: 'S'}
									</Form.Label>
									<Form.Control
										type='text'
										value={countInStock_S_34}
										required
										onChange={(e) => setCountInStock_S(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>

						<Row>
							<Col md={6}>
								<Form.Group controlId='countInStock_M_36'>
									<Form.Label>
										Stock of{' '}
										{selectedcategory === 'jackets' ||
										selectedcategory === 'suits'
											? '36'
											: 'M'}
									</Form.Label>
									<Form.Control
										type='text'
										value={countInStock_M_36}
										required
										onChange={(e) => setCountInStock_M(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId='countInStock_L_38'>
									<Form.Label>
										Stock of{' '}
										{selectedcategory === 'jackets' ||
										selectedcategory === 'suits'
											? '38'
											: 'L'}
									</Form.Label>
									<Form.Control
										type='text'
										value={countInStock_L_38}
										required
										onChange={(e) => setCountInStock_L(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Form.Group controlId='countInStock_XL_40'>
									<Form.Label>
										Stock of{' '}
										{selectedcategory === 'jackets' ||
										selectedcategory === 'suits'
											? '40'
											: 'XL'}
									</Form.Label>
									<Form.Control
										type='text'
										value={countInStock_XL_40}
										required
										onChange={(e) => setCountInStock_XL(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>

							<Col md={6}>
								<Form.Group controlId='countInStock_2XL_42'>
									<Form.Label>
										Stock of{' '}
										{selectedcategory === 'jackets' ||
										selectedcategory === 'suits'
											? '42'
											: '2XL'}
									</Form.Label>
									<Form.Control
										type='text'
										value={countInStock_2XL_42}
										required
										onChange={(e) => setCountInStock_XXL(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>

						<Row>
							<Col md={6}>
								<Form.Group controlId='countInStock_XL_40'>
									<Form.Label>
										Stock of{' '}
										{selectedcategory === 'jackets' ||
										selectedcategory === 'suits'
											? '44'
											: '3XL'}
									</Form.Label>
									<Form.Control
										type='text'
										value={countInStock_3XL_44}
										required
										onChange={(e) => setCountInStock_3XL_44(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>

							<Col md={6}>
								<Form.Group controlId='countInStock_2XL_42'>
									<Form.Label>
										Stock of{' '}
										{selectedcategory === 'jackets' ||
										selectedcategory === 'suits'
											? '46'
											: '4XL'}
									</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter Stock of 2XL'
										value={countInStock_4XL_46}
										required
										onChange={(e) => setCountInStock_4XL_46(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>

						<Row>
							<Col md={6}>
								<Form.Group controlId='countInStock_XL_40'>
									<Form.Label>
										Stock of{' '}
										{selectedcategory === 'jackets' ||
										selectedcategory === 'suits'
											? '48'
											: '5XL'}
									</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter Stock of XL'
										value={countInStock_5XL_48}
										required
										onChange={(e) => setCountInStock_5XL_48(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>

							<Col md={6}>
								<Form.Group controlId='countInStock_2XL_42'>
									<Form.Label>
										Stock of{' '}
										{selectedcategory === 'jackets' ||
										selectedcategory === 'suits'
											? '50'
											: '6XL'}
									</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter Stock of 2XL'
										value={countInStock_6XL_50}
										required
										onChange={(e) => setCountInStock_6XL_50(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>

						{selectedcategory === 'jackets' || selectedcategory === 'suits' ? (
							<Row>
								<Col md={6}>
									<Form.Group controlId='countInStock_XL_40'>
										<Form.Label>Stock of 52</Form.Label>
										<Form.Control
											type='text'
											value={countInStock_52}
											required
											onChange={(e) => setCountInStock_52(e.target.value)}
										></Form.Control>
									</Form.Group>
								</Col>

								<Col md={6}>
									<Form.Group controlId='countInStock_2XL_42'>
										<Form.Label>Stock of 54</Form.Label>
										<Form.Control
											type='text'
											value={countInStock_54}
											required
											onChange={(e) => setCountInStock_54(e.target.value)}
										></Form.Control>
									</Form.Group>
								</Col>
							</Row>
						) : null}

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
