import Axios from 'axios'
import {
	PRODUCT_LIST_FAILURE,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_DETAIL_FAILURE,
	PRODUCT_DETAIL_REQUEST,
	PRODUCT_DETAIL_SUCCESS,
} from '../constant/product.constant'

export const listProducts = () => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_LIST_REQUEST,
		})

		const { data } = await Axios.get('/api/products')
		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const productDetail = (id) => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_DETAIL_REQUEST,
		})

		const { data } = await Axios.get(`/api/products/${id}`)

		dispatch({
			type: PRODUCT_DETAIL_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAIL_FAILURE,
			error:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}