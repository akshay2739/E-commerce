import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MyNavbar = () => {
	return (
		<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
			<Container>
				<Navbar.Brand>
					<Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
						My-Shop
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='ml-auto'>
						<Nav.Link>
							<Link
								to='/search'
								style={{ textDecoration: 'none', color: 'inherit' }}
							>
								Search
							</Link>
						</Nav.Link>

						<Nav.Link>
							<Link
								to='/cart'
								style={{ textDecoration: 'none', color: 'inherit' }}
							>
								Cart
							</Link>
						</Nav.Link>

						<Nav.Link>
							<Link
								to='/wishlist'
								style={{ textDecoration: 'none', color: 'inherit' }}
							>
								Wishlist
							</Link>
						</Nav.Link>

						<Nav.Link>
							<Link
								to='/login'
								style={{ textDecoration: 'none', color: 'inherit' }}
							>
								Login
							</Link>
						</Nav.Link>

						<NavDropdown title='Dropdown' id='collasible-nav-dropdown'>
							<NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
							<NavDropdown.Item href='#action/3.2'>
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href='#action/3.4'>
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default MyNavbar
