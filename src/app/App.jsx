import { Main, Login, Users, NotFound, Logout } from './layouts'
import { NavBar } from './components/ui/NavBar'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/useProfession'
import { QualityProvider } from './hooks/useQualities'
import { AuthProvider } from './hooks/useAuth'
import { ProtectedRoute } from './components/common/ProtectedRoute'

function App() {
	return (
		<div className='wrapper'>
			<AuthProvider>
				<NavBar />
				<QualityProvider>
					<ProfessionProvider>
						<Switch>
							<Route path='/login/:type?' component={Login} />
							<ProtectedRoute path='/users/:userId?/:edit?' component={Users} />
							<Route path='/' exact component={Main} />
							<Route path='/logout' component={Logout} />
							<Route component={NotFound} />
						</Switch>
					</ProfessionProvider>
				</QualityProvider>
			</AuthProvider>
			<ToastContainer />
		</div>
	)
}

export default App
