import Axios from 'axios'
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	SAVE_PAYMENT_METHOD,
	SAVE_SHIPPING_ADDRESS,
	SAVE_ORDER_TYPE,
} from '../constant/cart.constant'

export const addItemToCartAction = (id, quantity) => async (
	dispatch,
	getState
) => {
	try {
		const { data } = await Axios.get(`/api/products/${id}`)

		const cartItem = {
			id: data.id,
			name: data.name,
			image: data.image,
			price: data.price,
			quantity,
		}

		dispatch({
			type: CART_ADD_ITEM,
			payload: cartItem,
		})

		localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
	} catch (error) {
		console.log('error')
	}
}

export const removeItemFromCartAction = (id) => async (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id,
	})

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveOrderType = (data) => async (dispatch) => {
	dispatch({
		type: SAVE_ORDER_TYPE,
		payload: data,
	})
	localStorage.setItem('orderType', JSON.stringify(data))
}

export const saveShippingAddress = (data) => async (dispatch) => {
	dispatch({
		type: SAVE_SHIPPING_ADDRESS,
		payload: data,
	})

	localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => async (dispatch) => {
	dispatch({
		type: SAVE_PAYMENT_METHOD,
		payload: data,
	})

	localStorage.setItem('paymentMethod', JSON.stringify(data))
}
