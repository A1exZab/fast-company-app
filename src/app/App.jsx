import { Main, Login, Users, NotFound } from './layouts'
import { NavBar } from './components/ui/NavBar'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/useProfession'
import { QualityProvider } from './hooks/useQuality'

function App() {
	return (
		<div className='wrapper'>
			<NavBar />

			<Switch>
				<Route path='/' exact component={Main} />
				<QualityProvider>
					<ProfessionProvider>
						<Route path='/login/:type?' component={Login} />
						<Route path='/users/:userId?/:edit?' component={Users} />
					</ProfessionProvider>
				</QualityProvider>
				<Route component={NotFound} />
			</Switch>
			<ToastContainer />
		</div>
	)
}

export default App
