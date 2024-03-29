import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../action/userAction'
import SearchBox from './SearchBox'
import { Route } from 'react-router-dom'

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
			fixed='top'
			className='navbar navbar-expand-lg navbar-dark bg-primary shadow'
		>
			<Container>
				<Navbar.Brand>
					<Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
						MY-SHOP
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav>
						<LinkContainer
							to='/products/men'
							style={{ textDecoration: 'none', color: 'white', marginTop: 1 }}
						>
							<Nav.Link eventKey={2}>MEN</Nav.Link>
						</LinkContainer>

						<LinkContainer
							to='/products/women'
							style={{ textDecoration: 'none', color: 'white', marginTop: 1 }}
						>
							<Nav.Link eventKey={2}>WOMEN</Nav.Link>
						</LinkContainer>

						<LinkContainer
							to='/products/kids'
							style={{ textDecoration: 'none', color: 'white', marginTop: 1 }}
						>
							<Nav.Link eventKey={2}>KIDS</Nav.Link>
						</LinkContainer>
					</Nav>

					<Nav className='ml-auto'>
						<Route render={({ history }) => <SearchBox history={history} />} />
						<LinkContainer
							to='/cart'
							style={{ textDecoration: 'none', color: 'white', marginTop: 1 }}
						>
							<Nav.Link eventKey={2}>
								<i className='fas fa-shopping-cart'></i> Cart
							</Nav.Link>
						</LinkContainer>

						{userInfo ? (
							<NavDropdown
								title={
									<span
										style={{
											textDecoration: 'none',
											color: 'white',
											marginTop: 1,
										}}
									>
										<i className='fas fa-user'></i>
										{`  `}
										{userInfo.name}
									</span>
								}
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
								style={{ textDecoration: 'none', color: 'white', marginTop: 1 }}
							>
								<Nav.Link eventKey={2}>
									<i className='fas fa-user'></i> Login
								</Nav.Link>
							</LinkContainer>
						)}
						{userInfo && userInfo.role === 'my-shop-admin' && (
							<NavDropdown
								title={
									<span
										style={{
											textDecoration: 'none',
											color: 'white',
											marginTop: 1,
										}}
									>
										Admin
									</span>
								}
							>
								<LinkContainer to='/admin/userlist'>
									<NavDropdown.Item>Users</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to='/admin/productlist'>
									<NavDropdown.Item>Products</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to='/admin/orderlist'>
									<NavDropdown.Item>Orders</NavDropdown.Item>
								</LinkContainer>
							</NavDropdown>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default MyNavbar
