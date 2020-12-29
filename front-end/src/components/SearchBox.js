import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState('')

	const submitHandler = (e) => {
		e.preventDefault()
		if (keyword.trim()) {
			history.push(`/search/${keyword}`)
		} else {
			history.push('/')
		}
	}

	return (
		<Form onSubmit={submitHandler} inline>
			<Form.Control
				type='text'
				size='sm'
				name='q'
				onChange={(e) => setKeyword(e.target.value)}
				placeholder='Search...'
			></Form.Control>
			<Button
				type='submit'
				variant='primary'
				className='btn'
				style={{ textDecoration: 'none', color: 'white', marginTop: 1 }}
			>
				<i className='fas fa-search mr-2'></i>
				Search
			</Button>
		</Form>
	)
}

export default SearchBox
