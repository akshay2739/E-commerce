import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../action/userAction'

const MyNavbar = () => {
	const dispatch = useDispatch()

	const userInfo = useSelector((state) => state.userLoginReducer.userInfo)

	const logoutHandler = () => {
		dispatch(logout())
	}

	return (
		<Navbar
			style={{ backgroundColor: '', position: 'sticky' }}
			collapseOnSelect
			expand='lg'
			bg='dark'
			variant='dark'
			fixed='top'
		>
			<Container>
				<Navbar.Brand>
					<Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
						My-Shop
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='ml-auto'>
						<LinkContainer
							to='/search'
							style={{ textDecoration: 'none', color: 'white' }}
						>
							<Nav.Link eventKey={2}>Search</Nav.Link>
						</LinkContainer>

						<LinkContainer
							to='/cart'
							style={{ textDecoration: 'none', color: 'white' }}
						>
							<Nav.Link eventKey={2}>Cart</Nav.Link>
						</LinkContainer>

						<LinkContainer
							to='/wishlist'
							style={{ textDecoration: 'none', color: 'white' }}
						>
							<Nav.Link eventKey={2}>Wishlist</Nav.Link>
						</LinkContainer>

						{userInfo ? (
							<NavDropdown
								title={userInfo.name}
								style={{ textDecoration: 'none', color: 'white' }}
							>
								<LinkContainer to='/profile'>
									<NavDropdown.Item>Profile</NavDropdown.Item>
								</LinkContainer>
								<NavDropdown.Item onClick={logoutHandler}>
									Log out
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<LinkContainer
								to='/login'
								style={{ textDecoration: 'none', color: 'white' }}
							>
								<Nav.Link eventKey={2}>Login</Nav.Link>
							</LinkContainer>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default MyNavbar
