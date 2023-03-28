import React from 'react'
import Badge from 'react-bootstrap/Badge'
import PropTypes from 'prop-types'

export function SearchStatus({ usersAmount }) {
	return (
		<>
			{usersAmount > 0 ? (
				<Badge className='align-self-start fs-4'>
					Тусует с тобой сегодня {usersAmount} человек(а)
				</Badge>
			) : (
				<Badge bg='danger' className='align-self-start fs-3'>
					Cегодня с тобой никто не тусует 😒
				</Badge>
			)}
		</>
	)
}

SearchStatus.propTypes = {
	usersAmount: PropTypes.number.isRequired
}
