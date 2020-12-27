import Axios from 'axios'
import { LIST_MY_ORDERS_RESET } from '../constant/orderConstant.js'
import {
	USER_LOGIN_FAILURE,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_REGISTER_FAILURE,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_DETAILS_FAILURE,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_UPDATE_PROFILE_FAILURE,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_LOGOUT,
	USER_DETAILS_RESET,
	USER_LIST_SUCCESS,
	USER_LIST_FAILURE,
	USER_LIST_REQUEST,
} from '../constant/user.constant.js'

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		})

		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await Axios.post(
			'/api/users/login',
			{ email, password },
			config
		)

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})

		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const logout = () => async (dispatch) => {
	localStorage.removeItem('userInfo')

	dispatch({
		type: USER_LOGOUT,
	})
	dispatch({
		type: USER_DETAILS_RESET,
	})
	dispatch({
		type: LIST_MY_ORDERS_RESET,
	})
	document.location.href = '/login'
}

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		})

		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await Axios.post(
			'/api/users',
			{ name, email, password },
			config
		)

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		})

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})

		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
		})

		const userLogin = getState().userLoginReducer.userInfo

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userLogin.token}`,
			},
		}

		const { data } = await Axios.get(`/api/users/${id}`, config)

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const updateUserDetails = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_PROFILE_REQUEST,
		})

		const userLogin = getState().userLoginReducer.userInfo

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userLogin.token}`,
			},
		}

		const { data } = await Axios.put(`/api/users/profile`, user, config)

		dispatch({
			type: USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const listUsers = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_LIST_REQUEST })

		const userLogin = getState().userLoginReducer.userInfo

		const config = {
			headers: {
				Authorization: `Bearer ${userLogin.token}`,
			},
		}

		const { data } = await Axios.get(`/api/users`, config)

		dispatch({
			type: USER_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_LIST_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
