import Axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constant/cart.constant'

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
		console.log(cartItem)
		dispatch({
			type: CART_ADD_ITEM,
			payload: cartItem,
		})

		localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
	} catch (error) {}
}

export const removeItemFromCartAction = (id) => async (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id,
	})

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
