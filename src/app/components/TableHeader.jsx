import React from 'react'
import PropTypes from 'prop-types'

export function TableHeader({ onSort, selectedSort, columns }) {
	const handleSort = (item) => {
		if (selectedSort.path === item) {
			onSort({ ...selectedSort, order: selectedSort.order === 'asc' ? 'desc' : 'asc' })
		} else {
			onSort({ path: item, order: 'asc' })
		}
	}

	return (
		<thead>
			<tr>
				{Object.keys(columns).map((column) => (
					<th
						key={column}
						className='text-center align-middle'
						onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
						role={columns[column].path && 'button'}>
						{columns[column].name}
						{columns[column].path === selectedSort.path && (
							<img
								className=' ms-1'
								src={
									selectedSort.order === 'asc'
										? '/img/caret-up-fill.svg'
										: '/img/caret-down-fill.svg'
								}
								alt=''
							/>
						)}
					</th>
				))}
			</tr>
		</thead>
	)
}

TableHeader.propTypes = {
	onSort: PropTypes.func.isRequired,
	selectedSort: PropTypes.object.isRequired,
	columns: PropTypes.object.isRequired
}
