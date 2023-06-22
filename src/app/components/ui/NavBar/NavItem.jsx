import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export function NavItem({ heading, to }) {
	return (
		<li className='nav-item' style={{ '--bs-nav-link-hover-color': 'var(--bs-primary)' }}>
			<Link className='nav-link ' to={to}>
				{heading}
			</Link>
		</li>
	)
}

NavItem.propTypes = {
	heading: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired
}
