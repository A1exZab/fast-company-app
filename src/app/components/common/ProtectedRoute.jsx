import React from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../../hooks/useAuth'
import { Route, Redirect } from 'react-router-dom'

export function ProtectedRoute({ component: Component, ...rest }) {
	const { currentUser } = useAuth()
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!currentUser) {
					return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
				}

				return Component ? <Component {...props} /> : children
			}}
		/>
	)
}

ProtectedRoute.propTypes = {
	component: PropTypes.func,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}
