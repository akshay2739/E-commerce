import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrder from './screens/PlaceOrder'
import { Container } from 'react-bootstrap'
import OrderScreen from './screens/OrderScreen'
import ProductByType from './screens/ProductsByType'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductList'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<main className='py-3'>
					<Container>
						<Switch>
							<Route path='/product/:id' component={ProductScreen} />
							<Route path='/products/:type' component={ProductByType} />
							<Route path='/cart/:id?' component={CartScreen} />
							<Route path='/login' component={LoginScreen} />
							<Route path='/register' component={RegisterScreen} />
							<Route path='/profile' component={ProfileScreen} />
							<Route path='/shipping' component={ShippingScreen} />
							<Route path='/payment' component={PaymentScreen} />
							<Route path='/placeorder' component={PlaceOrder} />
							<Route path='/order/:id' component={OrderScreen} />
							<Route path='/admin/userlist' component={UserListScreen} />
							<Route path='/admin/user/:id/edit' component={UserEditScreen} />
							<Route path='/admin/productlist' component={ProductListScreen} />
							<Route
								path='/admin/product/:id/edit'
								component={ProductEditScreen}
							/>
							<Route path='/admin/orderlist' component={OrderListScreen} />
							<Route path='/search/:keyword' component={HomeScreen} />
							<Route path='/search/:keyword' component={HomeScreen} />
							<Route exact path='/' component={HomeScreen} exact />
						</Switch>
					</Container>
				</main>
				<Footer />
			</BrowserRouter>
		</>
	)
}

export default App
