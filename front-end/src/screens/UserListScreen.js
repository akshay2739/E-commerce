import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deleteUser, listUsers } from '../action/userAction'

const UserListScreen = ({ history }) => {
	const dispatch = useDispatch()

	const usersLogin = useSelector((state) => state.userLoginReducer)
	const { userInfo } = usersLogin

	const usersList = useSelector((state) => state.userList)
	const { loading, users, error } = usersList

	const usersDelete = useSelector((state) => state.userDelete)
	const { success: successDelete } = usersDelete

	useEffect(() => {
		window.scrollTo(0, 0)
		if (userInfo && userInfo.role === 'my-shop-admin') {
			dispatch(listUsers())
		} else {
			history.push('/login')
		}
	}, [dispatch, history, userInfo, successDelete])

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteUser(id))
		}
	}

	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped responsive className='table-sm text-center' bordered>
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>
									{user.role === 'my-shop-admin' ? (
										<i className='fas fa-check' style={{ color: 'green' }}></i>
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/admin/user/${user.id}/edit`}>
										<Button variant='light' className='btn-sm'>
											<i className='fas fa-edit'></i>
										</Button>
									</LinkContainer>
									<Button
										variant='danger'
										className='btn-sm'
										onClick={() => deleteHandler(user.id)}
									>
										<i className='fas fa-trash'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	)
}

export default UserListScreen
