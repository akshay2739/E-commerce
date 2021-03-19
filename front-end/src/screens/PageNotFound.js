import React from 'react'
import {
	Button,
	Col,
	Row,
	ListGroup,
	Image,
	Card,
	Container,
} from 'react-bootstrap'

import './css/pageNotFound.css'

const PageNotFound = ({ history, location }) => {
	return (
		<div className='page-not-found'>
			<Container
				style={{ width: '100vw', minHeight: '90vh' }}
				className='d-flex justify-content-center flex-column align-items-center'
			>
				<h1>Oh Snap!</h1>
				<h2>{location.state ? location.state : 'Page Not Found'}</h2>
				<div className='link-container'>
					<Button onClick={() => history.goBack()} className='mt-5'>
						Go back!
					</Button>
					<Button onClick={() => history.push('/')} className='mt-5'>
						Home
					</Button>
				</div>
			</Container>
		</div>
	)
}

export default PageNotFound
