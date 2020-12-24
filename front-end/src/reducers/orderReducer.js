import {
	ORDER_CREATE_FAILURE,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAIL_FAILURE,
	ORDER_DETAIL_REQUEST,
	ORDER_DETAIL_SUCCESS,
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
