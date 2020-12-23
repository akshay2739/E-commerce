import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	SAVE_SHIPPING_ADDRESS,
} from '../constant/cart.constant'

export const cartReducer = (
	state = { cartItems: [], shippingAddress: {} },
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

		case SAVE_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: action.payload,
			}
		default:
			return state
	}
}
