import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
	createProduct,
	deleteProduct,
	listProducts,
} from '../action/productAction'
import { PRODUCT_CREATE_RESET } from '../constant/product.constant'

const ProductListScreen = ({ history, match }) => {
	const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch()

	const usersLogin = useSelector((state) => state.userLoginReducer)
	const { userInfo } = usersLogin

	const productsList = useSelector((state) => state.productsList)
	const { loading, products, error, pages, page } = productsList

	const productDelete = useSelector((state) => state.productDelete)
	const {
		loading: loadingDelete,
		success: successDelete,
		error: errorDelete,
	} = productDelete

	const productCreate = useSelector((state) => state.productCreate)
	const {
		loading: loadingCreate,
		success: successCreate,
		error: errorCreate,
		product: createdProduct,
	} = productCreate

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET })

		if (userInfo.role !== 'my-shop-admin') {
			history.push('/login')
			dispatch(listProducts())
		}

		if (successCreate) {
			history.push(`/admin/product/${createdProduct.id}/edit`)
		} else {
			dispatch(listProducts('', pageNumber))
		}
	}, [
		dispatch,
		history,
		userInfo,
		successDelete,
		successCreate,
		createdProduct,
		pageNumber,
	])

	const createProducthandler = () => {
		dispatch(createProduct())
	}

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteProduct(id))
		}
	}

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-2' onClick={createProducthandler}>
						<i className='fas fa-plus'></i> Create Product
					</Button>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant='danger'>{errorCreate}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Table striped responsive className='table-sm text-center' bordered>
						<thead>
							<tr>
								<th>Id</th>
								<th>Name</th>
								<th>Price</th>
								<th>Category</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product.id}>
									<td>{product.id}</td>
									<td>{product.name}</td>
									<td>$ {product.price}</td>
									<td>{product.category}</td>
									<td>
										<LinkContainer to={`/admin/product/${product.id}/edit`}>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => deleteHandler(product.id)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Paginate keyword='' page={page} pages={pages} role='my-shop-admin' />
				</>
			)}
		</>
	)
}

export default ProductListScreen
