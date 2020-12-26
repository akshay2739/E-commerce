import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	SAVE_ORDER_TYPE,
	SAVE_PAYMENT_METHOD,
	SAVE_SHIPPING_ADDRESS,
} from '../constant/cart.constant'
import { CART_CLEAR_ITEMS } from '../constant/cart.constant'

export const cartReducer = (
	state = {
		cartItems: [],
		shippingAddress: {},
		paymentMethod: '',
		orderType: '',
	},
	action
) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const newItem = action.payload
			console.log('new item', newItem)
			const existingItem = state.cartItems.find(
				(item) => item.id === newItem.id
			)
			if (existingItem) {
				return {
					...state,
					cartItems: state.cartItems.map((item) =>
						item.id === newItem.id ? newItem : item
					),
				}
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, newItem],
				}
			}

		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter((item) => item.id !== action.payload),
			}

		case SAVE_ORDER_TYPE:
			return {
				...state,
				orderType: action.payload,
			}

		case SAVE_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: action.payload,
			}

		case SAVE_PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: action.payload,
			}

		case CART_CLEAR_ITEMS:
			return {
				...state,
				cartItems: [],
			}

		default:
			return state
	}
}
