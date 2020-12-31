import React from 'react'
import { Col, Row, Image } from 'react-bootstrap'

const LandingCarousel = () => {
	return (
		<div style={{ position: 'relative' }}>
			<video
				autoPlay
				muted
				loop
				style={{
					width: '100%',
					height: '50vh',
					objectFit: 'cover',
					position: 'relative',
					zIndex: 0,
				}}
			>
				<source src='/images/video.mp4' type='video/mp4' />
			</video>

			<div
				style={{
					background: 'rgba(0, 0, 0, 0.5)',
					opacity: 1,
					width: '100%',
					height: '50vh',
					position: 'absolute',
					top: 0,
					left: 0,
					zIndex: 0,
					justifyContent: 'center',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<h1
					style={{
						color: '#ffffff',
						opacity: 1,
						fontWeight: 'bold',
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
