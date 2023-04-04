import { Main, Login, Users } from './layouts'
import { Nav } from './components'
import { NotFound } from './components/NotFound'

import { Switch, Route } from 'react-router-dom'

function App() {
	return (
		<div className='wrapper'>
			<Nav />
			<div className='content'>
				<Switch>
					<Route exact path='/' component={Main} />
					<Route path='/login' component={Login} />
					<Route path='/users/:userId?' component={Users} />
					<Route component={NotFound} />
				</Switch>
			</div>
		</div>
	)
}

export default App
