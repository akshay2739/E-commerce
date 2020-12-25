import Axios from 'axios'
import {
	ORDER_CREATE_FAILURE,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAIL_FAILURE,
	ORDER_DETAIL_REQUEST,
	ORDER_DETAIL_SUCCESS,
	ORDER_PAY_FAILURE,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_RESET,
} from '../constant/orderConstant'

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
		})

		const userLogin = getState().userLoginReducer.userInfo

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userLogin.token}`,
			},
		}

		const { data } = await Axios.post(`/api/orders`, order, config)

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAILURE,
			error:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAIL_REQUEST,
		})

		const userLogin = getState().userLoginReducer.userInfo

		const config = {
			headers: {
				Authorization: `Bearer ${userLogin.token}`,
			},
		}

		const { data } = await Axios.get(`/api/orders/${id}`, config)

		dispatch({
			type: ORDER_DETAIL_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ORDER_DETAIL_FAILURE,
			error:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_PAY_REQUEST,
		})

		const userLogin = getState().userLoginReducer.userInfo

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userLogin.token}`,
			},
		}

		const { data } = await Axios.put(
			`/api/orders/${id}/pay`,
			paymentResult,
			config
		)

		dispatch({
			type: ORDER_PAY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ORDER_PAY_FAILURE,
			error:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
