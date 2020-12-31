import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listAllOrders } from '../action/orderAction'

const OrderListScreen = ({ history }) => {
	const dispatch = useDispatch()

	const usersLogin = useSelector((state) => state.userLoginReducer)
	const { userInfo } = usersLogin

	const orderList = useSelector((state) => state.orderList)
	const { loading, orders, error } = orderList

	useEffect(() => {
		window.scrollTo(0, 0)
		if (userInfo && userInfo.role === 'my-shop-admin') {
			dispatch(listAllOrders())
		} else {
			history.push('/login')
		}
	}, [dispatch, history, userInfo])

	return (
		<>
			<h1>Orders</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped responsive className='table-sm text-center' bordered>
					<thead>
						<tr>
							<th>Id</th>
							<th>User</th>
							<th>Date</th>
							<th>Total Price</th>
							<th>Paid</th>
							<th>Delivered</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order.id}>
								<td>{order.id}</td>
								<td>{order.user && order.user.name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>$ {order.totalPrice}</td>
								<td>
									{order.isPaid ? (
										<td>{order.paidAt.substring(0, 10)}</td>
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									{order.isDelivered ? (
										<td>{order.deliveredAt.substring(0, 10)}</td>
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/order/${order.id}`}>
										<Button variant='light' className='btn-sm'>
											Details
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	)
}

export default OrderListScreen
