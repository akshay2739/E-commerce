import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Footer = () => {
	return (
		<div className='bg-primary text-white text-center'>
			<footer className=' container page-footer font-small pt-4'>
				<div className='container-fluid text-center text-md-left'>
					<div className='row'>
						<div className='col-md-6 mt-md-0 mt-3'>
							<h5 className='text-uppercase text-center'>MY-Shop</h5>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
								Molestiae, veniam tenetur natus dolor hic dignissimos, aperiam
								ut quam, esse iusto nam minima architecto. Sunt debitis eos
								dolorem aliquid qui numquam?
							</p>
						</div>

						<hr className='clearfix w-100 d-md-none pb-3' />

						<div className='col-md-6 mb-md-0 mb-3 text-center'>
							<h5 className='text-uppercase'>Contact Us</h5>
							<Row>
								<Col>
									Phone : <strong>1234567890</strong>
								</Col>
							</Row>
							<Row>
								<Col>
									Mail : <strong>support@my-shop.com</strong>
								</Col>
							</Row>
							<Row>
								<Col>
									Address : <strong>3016 Bellwood Acres Rd,Huntsville</strong>
								</Col>
							</Row>
						</div>
					</div>
				</div>

				{/* <iframe
					title='map'
					className='shadow'
					src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.67345386066!2d-122.48760368437033!3d48.86443697928807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485ba44f3447de5%3A0xe506691a25db8d5a!2sBellewood%20Farms%20%26%20Distillery!5e0!3m2!1sen!2sin!4v1609408997098!5m2!1sen!2sin'
					style={{ width: '100%', height: 250 }}
				></iframe> */}

				<div className='footer-copyright text-center py-3'>
					{new Date().getFullYear()} Copyright: My-Shop
				</div>
			</footer>
		</div>
	)
}

export default Footer
