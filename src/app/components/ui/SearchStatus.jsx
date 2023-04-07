import React from 'react'
import PropTypes from 'prop-types'

export function SearchStatus({ usersAmount }) {
	return (
		<>
			{usersAmount > 0 ? (
				<span className='badge text-light text-bg-primary align-self-start fs-4'>
					Тусует с тобой сегодня {usersAmount} человек(а)
				</span>
			) : (
				<span bg='danger' className='badge text-light text-bg-danger align-self-start fs-3'>
					Cегодня с тобой никто не тусует 😒
				</span>
			)}
		</>
	)
}

SearchStatus.propTypes = {
	usersAmount: PropTypes.number.isRequired
}
