import { Main, Login, Users, NotFound, Logout } from './layouts'
import { NavBar } from './components/ui/NavBar'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './hooks/useAuth'
import { ProtectedRoute } from './components/common/ProtectedRoute'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadQualitiesList } from './store/qualities'
import { loadProfessionsList } from './store/professions'

function App() {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(loadQualitiesList())
		dispatch(loadProfessionsList())
	}, [])
	return (
		<div className='wrapper'>
			<AuthProvider>
				<NavBar />

				<Switch>
					<Route path='/login/:type?' component={Login} />
					<ProtectedRoute path='/users/:userId?/:edit?' component={Users} />
					<Route path='/' exact component={Main} />
					<Route path='/logout' component={Logout} />
					<Route component={NotFound} />
				</Switch>
			</AuthProvider>
			<ToastContainer />
		</div>
	)
}

export default App
