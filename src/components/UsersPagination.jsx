import React from 'react'
import Pagination from 'react-bootstrap/Pagination'
import _ from 'lodash'
import PropTypes from 'prop-types'

export function UsersPagination({ itemsAmount, pageSize, currentPage, onPageChange }) {
	const pageCount = Math.ceil(itemsAmount / pageSize)
	if (pageCount === 1) return null

	const pages = _.range(1, pageCount + 1)

	return (
		<Pagination className='m-3 d-flex justify-content-center align-items-center'>
			{pages.map((page) => {
				return (
					<Pagination.Item
						key={'page_' + page}
						active={page === currentPage}
						onClick={() => onPageChange(page)}>
						{page}
					</Pagination.Item>
				)
			})}
		</Pagination>
	)
}

UsersPagination.propTypes = {
	itemsAmount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired
}
