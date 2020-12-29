import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducer'
import {
	myordersListReducer,
	orderCreateReducer,
	orderDeliverReducer,
	orderDetailReducer,
	orderPayReducer,
	ordersListReducer,
} from './reducers/orderReducer'
import {
	productCreateReducer,
	productDeleteReducer,
	productDetailReducer,
	productListReducer,
	productUpdateReducer,
} from './reducers/productReducer'
import {
	userDeleteReducer,
	userDetailsReducer,
	userEditReducer,
	userListReducer,
	userLoginReducer,
	userRegisterReducer,
	userUpdateReducer,
} from './reducers/userReducer'

const reducer = combineReducers({
	productsList: productListReducer,
	productDetail: productDetailReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	cart: cartReducer,
	userLoginReducer: userLoginReducer,
	userRegisterReducer: userRegisterReducer,
	userDetailsReducer: userDetailsReducer,
	userUpdateReducer: userUpdateReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userEdit: userEditReducer,
	orderCreateReducer: orderCreateReducer,
	orderDetailsReducer: orderDetailReducer,
	orderPayReducer: orderPayReducer,
	orderList: ordersListReducer,
	orderDeliver: orderDeliverReducer,
	myOrdersListReducer: myordersListReducer,
})

const localCartItems = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []

const userInfoFromLocal = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

const orderTypeFromLocal = localStorage.getItem('orderType')
	? JSON.parse(localStorage.getItem('orderType'))
	: {}

const shippingAddressFromLocal = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {}

const paymentMethodFromLocal = localStorage.getItem('paymentMethod')
	? JSON.parse(localStorage.getItem('paymentMethod'))
	: {}

const initialState = {
	cart: {
		cartItems: localCartItems,
		shippingAddress: shippingAddressFromLocal,
		paymentMethod: paymentMethodFromLocal,
		orderType: orderTypeFromLocal,
	},
	userLoginReducer: { userInfo: userInfoFromLocal },
}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
