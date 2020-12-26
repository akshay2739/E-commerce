import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveOrderType, saveShippingAddress } from '../action/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'

const ShippingScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart

	const [orderType, setOrderType] = useState('takeAway')

	const [address, setAddress] = useState(shippingAddress.address)
	const [city, setCity] = useState(shippingAddress.city)
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
	const [country, setCountry] = useState(shippingAddress.country)

	const dispatch = useDispatch()

	const submitTakeAwayHandler = (e) => {
		e.preventDefault()
		dispatch(saveOrderType('takeAway'))
		history.push('/payment')
	}

	const submitAddressHandler = (e) => {
		dispatch(saveOrderType('homeDelivery'))
		dispatch(saveShippingAddress({ address, city, postalCode, country }))
		history.push('/payment')
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form>
				<Form.Group controlId='address'>
					<Form.Label as='legend'>Select Method</Form.Label>

					<Col>
						<Form.Check
							type='radio'
							label='Take Away'
							id='takeAway'
							name='paymentMethod'
							value='takeAway'
							onChange={(e) => setOrderType(e.target.value)}
						></Form.Check>

						<Form.Check
							type='radio'
							label='Home Delivery'
							id='homeDelivery'
							name='paymentMethod'
							value='homeDelivery'
							onChange={(e) => setOrderType(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>
			</Form>
			{orderType === 'takeAway' ? (
				<Button variant='primary' onClick={submitTakeAwayHandler}>
					Continue
				</Button>
			) : (
				<Form onSubmit={submitAddressHandler}>
					<Form.Group controlId='address'>
						<Form.Label>Enter address</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter address'
							value={address}
							required
							onChange={(e) => setAddress(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='city'>
						<Form.Label>Enter city</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter city'
							value={city}
							required
							onChange={(e) => setCity(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='Postal Code'>
						<Form.Label>Enter Postal Code</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Postal Code'
							value={postalCode}
							required
							onChange={(e) => setPostalCode(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='country'>
						<Form.Label>Enter country</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter country'
							value={country}
							required
							onChange={(e) => setCountry(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Button type='submit' variant='primary'>
						Continue
					</Button>
				</Form>
			)}
		</FormContainer>
	)
}

export default ShippingScreen
