import { Main, Login, Users, NotFound, Logout } from './layouts'
import { NavBar } from './components/ui/NavBar'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ProtectedRoute } from './components/common/ProtectedRoute'
import { AppLoader } from './components/ui/hoc/AppLoader'

function App() {
	return (
		<div className='wrapper'>
			<AppLoader>
				<NavBar />
				<Switch>
					<Route path='/login/:type?' component={Login} />
					<ProtectedRoute path='/users/:userId?/:edit?' component={Users} />
					<Route path='/' exact component={Main} />
					<Route path='/logout' component={Logout} />
					<Route component={NotFound} />
				</Switch>

				<ToastContainer />
			</AppLoader>
		</div>
	)
}

export default App
