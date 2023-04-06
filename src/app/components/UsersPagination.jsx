import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

export function UsersPagination({ itemsAmount, pageSize, currentPage, onPageChange }) {
	const pageCount = Math.ceil(itemsAmount / pageSize)
	if (pageCount === 1) return null

	const pages = _.range(1, pageCount + 1)

	return (
		<nav>
			<ul className='pagination d-flex justify-content-center align-items-center m-0'>
				{pages.map((page) => {
					return (
						<li
							className={'page-item' + (page === currentPage ? ' active' : '')}
							key={'page_' + page}>
							<button className='page-link' onClick={() => onPageChange(page)}>
								{page}
							</button>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}

UsersPagination.propTypes = {
	itemsAmount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired
}
