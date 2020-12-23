import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducer'
import {
	productDetailReducer,
	productListReducer,
} from './reducers/productReducer'
import { userLoginReducer } from './reducers/userReducer'

const reducer = combineReducers({
	productList: productListReducer,
	productDetail: productDetailReducer,
	cart: cartReducer,
	userReducer: userLoginReducer,
})

const localCartItems = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []

const userInfoFromLocal = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

const initialState = {
	cart: { cartItems: localCartItems },
	userReducer: { userInfo: userInfoFromLocal },
}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
