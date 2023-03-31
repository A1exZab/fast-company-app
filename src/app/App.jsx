import { Users, User, Navigation } from './components'
import { Main } from './components/Main'
import { Login } from './components/Login'
import { NotFound } from './components/NotFound'

import { Switch, Route } from 'react-router-dom'

function App() {
	return (
		<div className='wrapper'>
			<Navigation />
			<div className='h-100 bg-dark text-light'>
				<Switch>
					<Route exact path='/' component={Main} />
					<Route path='/login' component={Login} />
					<Route exact path='/users' component={Users} />
					<Route path='/users/:userId?' component={User} />
					<Route component={NotFound} />
				</Switch>
			</div>
		</div>
	)
}

export default App
