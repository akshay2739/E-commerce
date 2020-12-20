import {
	PRODUCT_DETAIL_REQUEST,
	PRODUCT_DETAIL_FAILURE,
	PRODUCT_DETAIL_SUCCESS,
	PRODUCT_LIST_FAILURE,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
} from '../constant/product.constant'

export const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { loading: true, products: [] }
		case PRODUCT_LIST_SUCCESS:
			return { loading: false, products: action.payload }
		case PRODUCT_LIST_FAILURE:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const productDetailReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case PRODUCT_DETAIL_REQUEST:
			return {
				loading: true,
				product: {},
			}
		case PRODUCT_DETAIL_SUCCESS:
			return {
				loading: false,
				product: action.payload,
			}
		case PRODUCT_DETAIL_FAILURE:
			return {
				loading: false,
				error: action.error,
			}
		default:
			return state
	}
}
