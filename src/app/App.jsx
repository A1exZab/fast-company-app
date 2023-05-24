import { Main, Login, Users, NotFound } from './layouts'
import { NavBar } from './components/ui/NavBar'
import { Switch, Route } from 'react-router-dom'

function App() {
	return (
		<div className='wrapper'>
			<NavBar />

			<Switch>
				<Route exact path='/' component={Main} />
				<Route path='/login/:type?' component={Login} />
				<Route path='/users/:userId?/:edit?' component={Users} />
				<Route component={NotFound} />
			</Switch>
		</div>
	)
}

export default App
