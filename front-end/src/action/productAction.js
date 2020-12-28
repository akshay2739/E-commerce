import axios from 'axios'
import Axios from 'axios'
import {
	PRODUCT_LIST_FAILURE,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_DETAIL_FAILURE,
	PRODUCT_DETAIL_REQUEST,
	PRODUCT_DETAIL_SUCCESS,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_FAILURE,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_FAILURE,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_FAILURE,
	PRODUCT_UPDATE_SUCCESS,
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

export const listProductsByType = (type) => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_LIST_REQUEST,
		})

		const { data } = await Axios.get(`/api/products/products/${type}`)
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

export const deleteProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_DELETE_REQUEST,
		})

		const userLogin = getState().userLoginReducer.userInfo

		const config = {
			headers: {
				Authorization: `Bearer ${userLogin.token}`,
			},
		}

		await axios.delete(`/api/products/${id}`, config)

		dispatch({
			type: PRODUCT_DELETE_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_DELETE_FAILURE,
			error:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const createProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_CREATE_REQUEST,
		})

		const userLogin = getState().userLoginReducer.userInfo

		const config = {
			headers: {
				Authorization: `Bearer ${userLogin.token}`,
			},
		}

		const { data } = await axios.post(`/api/products`, {}, config)

		dispatch({
			type: PRODUCT_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_FAILURE,
			error:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const updateProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_UPDATE_REQUEST,
		})

		const userLogin = getState().userLoginReducer.userInfo

		const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userLogin.token}`,
			},
		}

		const { data } = await axios.put(
			`/api/products/${product.id}`,
			{ product },
			config
		)

		dispatch({
			type: PRODUCT_UPDATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_UPDATE_FAILURE,
			error:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
