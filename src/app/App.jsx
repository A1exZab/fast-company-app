import { Main, Login, Users } from './layouts'
import { Navigation } from './components'
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
					{/* <Route exact path='/users' component={Users} /> */}
					<Route path='/users/:userId?' component={Users} />
					<Route component={NotFound} />
				</Switch>
			</div>
		</div>
	)
}

export default App
