import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from 'react-router-dom'
import App from './app/App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createStore } from './app/store/createStore'
import { Provider } from 'react-redux'
import history from './app/utils/history'

const store = createStore()

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<Router history={history}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</Router>
	</Provider>
)
