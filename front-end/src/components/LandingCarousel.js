import React from 'react'
import { Col, Row, Image } from 'react-bootstrap'

const LandingCarousel = () => {
	return (
		<div
			style={{
				backgroundImage: `url(https://images.pexels.com/photos/1336873/pexels-photo-1336873.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500)`,
				width: '100%',
				height: '40vh',
				backgroundPosition: 'center',
				marginBottom: 20,
			}}
		>
			<div
				style={{
					backgroundColor: 'black',
					opacity: 0.7,
					width: '100%',
					height: '40vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<h1
					style={{
						color: 'white',
						fontSize: '3rem',
						textAlign: 'center',
					}}
				>
					Welcome to My-Shop
				</h1>
			</div>
		</div>
	)
}

export default LandingCarousel
