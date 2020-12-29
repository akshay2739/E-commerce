import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta name='keywords' content={keywords}></meta>
		</Helmet>
	)
}

Meta.defaultProps = {
	title: 'Welcome to My-Shop',
	description: 'We sell the best products for cheap',
	keywords: 'clothing,best cloths,mens,womens',
}

export default Meta
