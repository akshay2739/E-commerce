import {
	LIST_MY_ORDERS_FAILURE,
	LIST_MY_ORDERS_REQUEST,
	LIST_MY_ORDERS_RESET,
	LIST_MY_ORDERS_SUCCESS,
	LIST_ORDERS_FAILURE,
	LIST_ORDERS_REQUEST,
	LIST_ORDERS_RESET,
	LIST_ORDERS_SUCCESS,
	ORDER_CREATE_FAILURE,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAIL_FAILURE,
	ORDER_DETAIL_REQUEST,
	ORDER_DETAIL_SUCCESS,
	ORDER_PAY_FAILURE,
	ORDER_PAY_REQUEST,
	ORDER_PAY_RESET,
	ORDER_PAY_SUCCESS,
	ORDER_DELIVER_FAILURE,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_RESET,
} from '../constant/orderConstant'

export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return {
				...state,
				loading: true,
			}

		case ORDER_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				order: action.payload,
			}

		case ORDER_CREATE_FAILURE:
			return {
				loading: false,
				error: action.payload,
			}

		default:
			return {
				...state,
			}
	}
}

export const orderDetailReducer = (
	state = { loading: true, orderItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case ORDER_DETAIL_REQUEST:
			return {
				...state,
				loading: true,
			}

		case ORDER_DETAIL_SUCCESS:
			return {
				loading: false,
				order: action.payload,
			}

		case ORDER_DETAIL_FAILURE:
			return {
				loading: false,
				error: action.payload,
			}

		default:
			return {
				...state,
			}
	}
}

export const orderDeliverReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_DELIVER_REQUEST:
			return {
				loading: true,
			}

		case ORDER_DELIVER_SUCCESS:
			return {
				loading: false,
				success: true,
			}

		case ORDER_DELIVER_FAILURE:
			return {
				loading: false,
				error: action.payload,
			}

		case ORDER_DELIVER_RESET:
			return {}

		default:
			return {
				...state,
			}
	}
}

export const orderPayReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_PAY_REQUEST:
			return {
				loading: true,
			}

		case ORDER_PAY_SUCCESS:
			return {
				loading: false,
				success: true,
			}

		case ORDER_PAY_FAILURE:
			return {
				loading: false,
				error: action.payload,
			}

		case ORDER_PAY_RESET:
			return {}

		default:
			return {
				...state,
			}
	}
}

export const myordersListReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case LIST_MY_ORDERS_REQUEST:
			return {
				...state,
				loading: true,
			}

		case LIST_MY_ORDERS_SUCCESS:
			return {
				...state,
				loading: false,
				orders: action.payload,
			}

		case LIST_MY_ORDERS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			}

		case LIST_MY_ORDERS_RESET:
			return {
				orders: [],
			}

		default:
			return {
				...state,
			}
	}
}

export const ordersListReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case LIST_ORDERS_REQUEST:
			return {
				...state,
				loading: true,
			}

		case LIST_ORDERS_SUCCESS:
			return {
				...state,
				loading: false,
				orders: action.payload,
			}

		case LIST_ORDERS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			}

		case LIST_ORDERS_RESET:
			return {
				orders: [],
			}

		default:
			return {
				...state,
			}
	}
}
