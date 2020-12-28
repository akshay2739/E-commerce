import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { editUser, getUserDetails } from '../action/userAction'
import { USER_UPDATE_RESET } from '../constant/user.constant'

const UserEditScreen = ({ match, history }) => {
	const userID = match.params.id

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [role, setRole] = useState('users')

	const dispatch = useDispatch()

	const userDetails = useSelector((state) => state.userDetailsReducer)
	const { loading, error, user } = userDetails

	const userEdit = useSelector((state) => state.userEdit)
	const {
		loading: loadingEdit,
		error: errorEdit,
		success: successEdit,
	} = userEdit

	useEffect(() => {
		if (successEdit) {
			dispatch({ type: USER_UPDATE_RESET })
			history.push('/admin/userlist')
		} else {
			if (!user.name || user.id !== userID) {
				dispatch(getUserDetails(userID))
			} else {
				setName(user.name)
				setEmail(user.email)
				setRole(user.role)
			}
		}
	}, [user, dispatch, userID, successEdit, history])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(editUser({ id: userID, name, email, role }))
	}

	return (
		<>
			<Link to='/admin/userlist' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loadingEdit && <Loader />}
				{errorEdit && <Message variant='danger'>{errorEdit}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter name'
								value={name}
								required
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='email'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter Email'
								value={email}
								required
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='role'>
							<Form.Label>Role : </Form.Label>
							<Form.Control
								type='role'
								placeholder='Role'
								value={role}
								required
								onChange={(e) => setRole(e.target.value)}
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

export default UserEditScreen
